export interface CommandCallback {
    result?:    string;
    errorCode?: number;
    finished:   boolean;
    prompt?:    string;
}

export interface Command {
    name:        string;
    description: string;
    aliases?:    string[];
    exec:        (args: string[]) => Promise<CommandCallback>;
}