import Eris from "eris";
import { Define } from "./Define";

declare namespace Extended {
    interface ExtendedMessageContent extends Eris.AdvancedMessageContent {}

    export class Channel extends Eris.TextChannel {
        guild: Eris.Guild;
    }

    export class Message extends Eris.Message {
        channel: Channel;
        util: Classes.Util;
        getRole(args: string): Eris.Role | undefined;
        getChannel(args: string): Eris.Channel | undefined;
        getMember(args: string): Eris.Member | undefined;
        reply(content: string): Promise<Eris.Message<Eris.TextableChannel>>;
    }
}

declare namespace Classes {
    export class Util {
        codeBlock(content: string): string;
        sendMessage(content: Eris.MessageContent): Promise<Eris.Message<Eris.TextableChannel>>;
    }
}