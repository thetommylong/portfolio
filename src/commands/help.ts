import type { Command, CommandCallback } from "../types/commands";
import { commands } from "./index";

const command: Command = {
    name: "help",
    description: "Display information about available commands",
    async exec(args: string[]): Promise<CommandCallback> {
        if (args[0]) {
            const target = commands.get(args[0]);
            if (!target) {
                return {
                    result: `help: no help topics match '${args[0]}'`,
                    errorCode: 1,
                    finished: true,
                };
            }
            const aliasInfo = target.aliases ? ` (aliases: ${target.aliases.join(", ")})` : "";
            return {
                result: `${target.name}${aliasInfo} - ${target.description}`,
                errorCode: 0,
                finished: true,
            };
        }

        const uniqueCommands = new Set<Command>(commands.values());
        const lines: string[] = ["Available commands:\n"];

        for (const cmd of uniqueCommands) {
            const padName = cmd.name.padEnd(12, " ");
            lines.push(`  ${padName} ${cmd.description}`);
        }

        lines.push("\nType 'help <command>' for more detail.");

        return {
            result: lines.join("\n"),
            errorCode: 0,
            finished: true,
        };
    },
};

export default command;