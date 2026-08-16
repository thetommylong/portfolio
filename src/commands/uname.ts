import type { Command, CommandCallback } from "../types/commands";
import { user } from "../constants";

const command: Command = {
    name: "uname",
    description: "Print system information",
    async exec(args: string[]): Promise<CommandCallback> {
        const sys = {
            kernelName: "Linux",
            nodename: user.hostname,
            kernelRelease: "28.12.4",
            hardwarePlatform: "x86_64",
            operatingSystem: "GNU/Linux"
        };

        const flag = args[0] || "";
        console.log(args);

        if (flag === "-a" || flag === "--all") {
            return {
                result: `${sys.kernelName} ${sys.nodename} ${sys.kernelRelease} ${sys.hardwarePlatform} ${sys.operatingSystem}`,
                errorCode: 0,
                finished: true
            };
        }

        switch (flag) {
            case "-n":
            case "--nodename":
                return { result: sys.nodename, errorCode: 0, finished: true };
            case "-r":
            case "--kernel-release":
                return { result: sys.kernelRelease, errorCode: 0, finished: true };
            case "-m":
            case "-p":
            case "-i":
            case "--machine":
                return { result: sys.hardwarePlatform, errorCode: 0, finished: true };
            case "-o":
            case "--operating-system":
                return { result: sys.operatingSystem, errorCode: 0, finished: true };
            case "-s":
            case "--kernel-name":
            default:
                return { result: sys.kernelName, errorCode: 0, finished: true };
        }
    }
};

export default command;