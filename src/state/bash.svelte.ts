import { wm } from "./wm.svelte";
import { user } from "../constants";

let history = $state<string[]>([]);
let location = $state("/");

let console_e = $state<HTMLElement>();
let input = $state<HTMLInputElement>();

export const bash = {
    get prompt() { return `[${user.username}@${user.hostname} ${location}]~`},
    set location(path: string) { location = path; },
    get history() { return history; },

    handleKeyDown(e: KeyboardEvent) {
        if (e.key !== "Enter") return;
        if (!input) return;
        const val = input.value.trim().split(" ");
        history.push(`${this.prompt} ${val}`);
        const command = val[0]; 
        const args = val.slice(1);

        let output = "";

        switch (command) {
            case "clear": {
                history = [];
                output = "";
                input.value = "";
                return;
            }
            case "whoami": {
                output = user.username;
                break;
            }
            case "uname": {
                if (!args[0]) {
                    output = "Linux";
                }
                switch (args[0]) {
                    case "-n": {
                        output = user.hostname;
                        break;
                    }
                    case "-i": {
                        output = "unknown";
                        break;
                    }
                    case "-p": {
                        output = "unknown";
                        break;
                    }
                    case "-o": {
                        output = "GNU/Linux";
                        break;
                    }
                    default: {
                        output = "Linux";
                        break;
                    }
                }
                break;
            }
            case "exit": {
                output = "Please close the window manually. Closing via the command line will be implemented in a future release.";
                break;
            }
            case "sudo": {
                output = `${user.username} is not in the sudoers file. This incident will be reported.`
                break;
            }
            case "echo": {
                output = val.join(" ");
                break;
            }
            case "vi": case "vim": case "nvim": {
                output = "Please learn how to exit vi before using this tool."
                break;
            }
            case "fastfetch": case "neofetch": {
                wm.openAppById("info");
                break;
            }
            case "": {
                break;
            }
            default: {
                output = `bash: ${val}: command not found`;
                break;
            }
        } 

        history.push(output);
        input.value = "";
        if (console_e) console_e.scrollTop = console_e.scrollHeight;
    },

    register(node: HTMLElement) { console_e = node; console_e.addEventListener("click", () => input?.focus()) },

    registerInput(node: HTMLInputElement) { input = node; }
}