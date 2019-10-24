import {PrefixSupplier} from "discord-akairo";
import {Snowflake} from "discord.js";
import * as fs from "fs";

export type NeptuneClientOptions = {
    ownerid: Snowflake | Snowflake[];
    prefix: string | string[] | PrefixSupplier;
    commandDirectory: string;
    listenerDirectory: string;
    inhibitorDirectory: string;
    auth: {
        databaseUrl: string;
        token: string;
    };
    logChannels: {
        log: string;
        error: string;
        blocked: string;
    };
    color: string;
}

export function LoadConfig(path:string):NeptuneClientOptions {
    return Object.assign({
        ownerid: '',
        prefix: '',
        commandDirectory: '',
        listenerDirectory: '',
        inhibitorDirectory: '',
        auth: {
            databaseUrl: '',
            token: '',
        },
        logChannels: {
            log: '',
            error: '',
            blocked: '',
        },
        color: ''
    },JSON.parse(fs.readFileSync(path).toString()));
}
