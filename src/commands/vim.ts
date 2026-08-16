import type { Command, CommandCallback } from "../types/commands";

const command: Command = {
    name: "vim",
    aliases: ["vi", "nvim"],
    description: "Vi IMproved, a programmer's text editor",
    async exec(): Promise<CommandCallback> {
        return {
            result: "Please learn how to exit vim before using this tool.",
            errorCode: 1,
            finished: true
        };
    }
};

export default command;