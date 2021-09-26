import Eris from "eris";
import { Knex } from "knex";
import { commandPlugin, pluginData } from "./Command";

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
    interface getOptions {
        defaultQuery: string;
        withUser: boolean;
        customFilter: (data: any) => void;
    }

    export class PluginManager {
        cache: Map<string, commandPlugin>;
        pluginCache: Map<string, pluginData>;
        onMessage(message: Extended.Message, args: string[]): void;
    }
    export class GuildConfig {
        constructor(db: Knex, guild: Eris.Guild);
        public setOrEdit(table: string, query: object, update: boolean): Promise<any>;
        public get(table: string, query: object | string, options: getOptions): Promise<any>;
        public delete(table: string, query: object): Promise<void>;
    }
    export class Util {
        codeBlock(content: string): string;
        sendMessage(content: Eris.MessageContent): Promise<Eris.Message<Eris.TextableChannel>>;
        memberRoles(member: Eris.Member): Eris.Role[];
    }
}