import type { Command, CommandCallback } from "../types/commands";

const command: Command = {
    name: "clear",
    description: "Clear the terminal screen",
    async exec(): Promise<CommandCallback> {
        return {
            result: "\x1b[2J\x1b[H",
            finished: true,
        };
    },
};

export default command;