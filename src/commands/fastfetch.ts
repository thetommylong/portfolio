import type { Command, CommandCallback } from "../types/commands";
import { wm } from "../state/wm.svelte";

const command: Command = {
    name: "fastfetch",
    aliases: [ "neofetch" ],
    description: "Display information",
    async exec(): Promise<CommandCallback> {
        wm.openAppById("info");
        
        return {
            result: "",
            errorCode: 0,
            finished: true
        };
    }
};

export default command;