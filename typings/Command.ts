import Eris from "eris";
import { Define } from "./Define";
import { Extended } from "./Classes";

export interface CommandData {
    name: string;
    description: string;
    execute: commandFunction;
    options: CommandOptions;
}

export interface CommandOptions {
    permLevel: perms;
    enabled: boolean;
    subs: string[];
    requiredArgs: number;
    hasArgs: (args: string[], message: Extended.Message) => string | boolean;
    permissions: Array<keyof Eris.Constants["Permissions"]>;
}

export interface CommandCTX {
    client: Define.Creeper;
    message: Extended.Message;
    args: {
        command: string[];
        has: string | object | number;
    };
}


export type commandFunction = (ctx: CommandCTX) => void;
export type perms = "Developer" | "Admin";
export type commandMap = Map<string, CommandData>;