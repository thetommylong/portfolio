import type { Command } from "../types/commands";

const modules = import.meta.glob<{ default: Command }>("./*.ts", { eager: true });

export const commands = new Map<string, Command>();

for (const path in modules) {
    if (path.endsWith("index.ts")) continue;
    const command = modules[path].default;
    if (command?.name) {
        commands.set(command.name, command);

        if (command.aliases) {
            for (const alias of command.aliases) {
                commands.set(alias, command);
            }
        }
    }
}

export async function runCommand(name: string, ...args: string[]) {
    const cmd = commands.get(name);

    if (!cmd) {
        return { result: `bash: command not found: ${name}`, errorCode: 127, finished: true };
    }

    return await cmd.exec(args);
}