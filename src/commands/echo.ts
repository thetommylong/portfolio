import type { Command, CommandCallback } from "../types/commands";

const command: Command = {
    name: "echo",
    description: "Write arguments to standard output",
    async exec(args: string[]): Promise<CommandCallback> {
        return {
            result: args.join(" "),
            finished: true,
        };
    },
};

export default command;