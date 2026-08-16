import type { Command, CommandCallback } from "../types/commands";

const command: Command = {
    name: "exit",
    description: "Exit the terminal session",
    async exec(): Promise<CommandCallback> {
        return {
            result: "Please close the window manually. Closing via the command line will be implemented in a future release.",
            errorCode: 0,
            finished: true
        };
    }
};

export default command;