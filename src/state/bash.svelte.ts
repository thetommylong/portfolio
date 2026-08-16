import { tick } from "svelte";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

import { user } from "../constants";
import { runCommand } from "../commands/index";

const DEFAULT_PROMPT = `[${user.username}@${user.hostname} ~]$\x1b[0m `;

export function terminal(node: HTMLElement) {
    let currentLine = "";
    let promptString = DEFAULT_PROMPT;
    let commandExecutionInProgress = false;
    let lastExecutedCommand = "";

    const term = new Terminal({
        cursorBlink: true,
        theme: {
            background: "#1e1e2e",
            foreground: "#cdd6f4",
            cursor: "#f5e0dc"
        },
        fontFamily: "monospace",
        fontSize: 14,
        allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(node);

    applyTheme(term);

    const writePrompt = () => term.write(`\r\n${promptString}`);

    const processCommand = async (input: string) => {
        const val = input.trim();
        
        const tokens = val ? val.split(/\s+/) : [];
        let name = tokens[0] || "";
        let args = tokens.slice(1);

        if (!val && !commandExecutionInProgress) {
            writePrompt();
            return;
        }

        if (commandExecutionInProgress) {
            name = lastExecutedCommand;
            args = ["--continue", val];
        }

        try {
            const callback = await runCommand(name, ...args);

            if (callback.finished) {
                promptString = DEFAULT_PROMPT;
                commandExecutionInProgress = false;
                lastExecutedCommand = "";
            } else {
                promptString = callback.prompt ? `\x1b[32m${callback.prompt}\x1b[0m ` : DEFAULT_PROMPT;
                commandExecutionInProgress = true;
                lastExecutedCommand = name;
            }

            if (callback.result) {
                term.write(`\r\n${callback.result.replace(/\n/g, "\r\n")}`);
            }
        } catch (err) {
            term.write(`\r\nUncaught Error: ${String(err)}`);
        }

        writePrompt();
    };

    const dataDisposable = term.onData(async (data) => {
        if (data === "\r") {
            const line = currentLine;
            currentLine = "";
            await processCommand(line);
        } else if (data === "\x7f") {
            if (currentLine.length > 0) {
                currentLine = currentLine.slice(0, -1);
                term.write("\b \b");
            }
        } else if (data >= " ") {
            currentLine += data;
            term.write(data);
        }
    });

    const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
            try {
                fitAddon.fit();
            } catch (e) {}
        });
    });
    resizeObserver.observe(node);

    const themeObserver = new MutationObserver(() => {
        applyTheme(term);
    });
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style"]
    })

    tick().then(() => {
        setTimeout(() => {
            fitAddon.fit();
            term.write(DEFAULT_PROMPT);
        }, 50);
    });

    return {
        destroy() {
            resizeObserver.disconnect();
            themeObserver.disconnect();
            dataDisposable.dispose();
            term.dispose();
        }
    };
}

function applyTheme(term: Terminal) {
    const style = getComputedStyle(document.documentElement);
    
    term.options.theme = {
        background: style.getPropertyValue("--base").trim() || "#1e1e2e",
        foreground: style.getPropertyValue("--text").trim() || "#cdd6f4",
        cursor: style.getPropertyValue("--accent").trim() || "#f5e0dc",
        selectionBackground: style.getPropertyValue("--accent").trim() + "33" 
    };
}