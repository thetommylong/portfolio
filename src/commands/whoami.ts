import type { Command, CommandCallback } from "../types/commands";
import { user } from "../constants";

const command: Command = {
    name: "whoami",
    description: "Print the user name associated with the current effective user ID.",
    async exec(): Promise<CommandCallback> {
        return {
            result: user.username,
            finished: true,
        };
    },
};

export default command;