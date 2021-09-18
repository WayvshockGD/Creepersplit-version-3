import { Define } from "./Define";
import { Extended } from "./Classes";

export interface MessageCreateEvent {
    message: Extended.Message;
    client: Define.Creeper;
}