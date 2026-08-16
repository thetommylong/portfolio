import type { Command, CommandCallback } from "../types/commands";

const command: Command = {
    name: "jsh",
    aliases: ["node", "deno"],
    description: "JavaScript REPL client",
    async exec(args): Promise<CommandCallback> {
        if (args.length === 0 || args[0] !== "--continue") {
            return {
                result: "Welcome to the JavaScript REPL. Type .help for help.",
                finished: false,
                prompt: "> "
            };
        }

        const [, ...commandTokens] = args;
        const code = commandTokens.join(" ").trim();

        if (!code) {
            return { result: "", finished: false, prompt: "> " };
        }

        if (code.startsWith(".")) {
            switch (code) {
                case ".help":
                    return { result: "just run .exit to exit that's it i'm not making anything else", finished: false, prompt: "> " };
                case ".exit":
                    return { result: "ok bye", finished: true };
                default:
                    return { result: "bro what", finished: false, prompt: "> " };
            }
        }

        try {
            const gEval = eval;
            const output = gEval(code);
            
            return {
                result: output === undefined ? "undefined" : String(output),
                finished: false,
                prompt: "> "
            };
        } catch (err) {
            return {
                result: String(err),
                finished: false,
                prompt: "> "
            };
        }
    }
};

export default command;