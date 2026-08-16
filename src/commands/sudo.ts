import type { Command, CommandCallback } from "../types/commands";
import { user } from "../constants";

const command: Command = {
    name: "sudo",
    description: "Execute a command as another user",
    async exec(): Promise<CommandCallback> {
        return {
            result: `${user.username} is not in the sudoers file. This incident will be reported.`,
            finished: true,
        };
    },
};

export default command;