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
        getColor(color: Colors): number;
    }
}