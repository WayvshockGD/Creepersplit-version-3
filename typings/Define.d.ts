import Eris from "eris";
import { CommandData } from "./Command";

declare namespace Define {
    type Colors = "Warning" | "Info" | "Success" | "Default";

    interface MessageOptions {
        delete: number | string;
    }

    export class Creeper extends Eris.Client {
        type: "Beta" | "Prod";
        commands: Map<string, CommandData>;
        subCommands: Map<string, CommandData>;
        aliases: Map<string, CommandData>;
        config: {
            token: {
                beta: string;
                bot: string;
            }
            enableEvents: boolean;
            prefix: string;
            beta: boolean;
            eris: Eris.ClientOptions;
        }
        getColor(color: Colors): number;
    }
}