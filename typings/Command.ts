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
    permissions: Array<keyof Eris.Constants["Permissions"]>;
}

export interface CommandCTX {
    client: Define.Creeper;
    message: Extended.Message;
    args: string[];
}


export type commandFunction = (ctx: CommandCTX) => void;
export type perms = "Developer" | "Admin";
export type commandMap = Map<string, CommandData>;