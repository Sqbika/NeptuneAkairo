import {AkairoClient, AkairoOptions, Command} from "discord-akairo";
import {NeptuneCommandHandler} from "./NeptuneCommandHandler";
import {NeptuneClientOptions} from "./Types/NeptuneClientOptions";
import {NeptuneListenerHandler} from "./NeptuneListenerHandler";
import {NeptuneInhibitorHandler} from "./NeptuneInhibitorHandler";
import {NeptuneDatabase} from "../Database/NeptuneDatabase";
import {User} from "../Database/Model/User";
import * as path from "path";

declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: NeptuneCommandHandler;
        listenerHandler: NeptuneListenerHandler;
        inhibitorHandler: NeptuneInhibitorHandler;
        database: NeptuneDatabase;
        config: NeptuneClientOptions;
    }
}

export class NeptuneClient extends AkairoClient {

    public commandHandler: NeptuneCommandHandler;
    public listenerHandler: NeptuneListenerHandler;
    public inhibitorHandler: NeptuneInhibitorHandler;
    public database: NeptuneDatabase;
    public config: NeptuneClientOptions;

    public constructor(config: NeptuneClientOptions) {
        super({
            ownerID: config.ownerid
        }, {
            disableEveryone: true,
            disabledEvents: ['TYPING_START'],
        });

        this.config = config;
        this.database = new NeptuneDatabase(config.auth.databaseUrl);

        this.commandHandler = new NeptuneCommandHandler(this, {
            prefix: config.prefix,
            directory: path.join(__dirname, '..', config.commandDirectory),
            automateCategories: true,
            loadFilter: filepath => {
                return filepath.endsWith(".js")
            }
        });
        this.inhibitorHandler = new NeptuneInhibitorHandler(this, {
            directory: path.join(__dirname, '..', config.inhibitorDirectory),
            automateCategories: true,
            loadFilter: filepath => {
                return filepath.endsWith(".js")
            }
        });
        this.listenerHandler = new NeptuneListenerHandler(this, {
            directory: path.join(__dirname, '..', config.listenerDirectory),
            automateCategories: true,
            loadFilter: filepath => {
                return filepath.endsWith(".js")
            }
        });
        this.commandHandler.on('error', console.log);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            inhibitorHandler: this.inhibitorHandler
        })
    }

    public start():void {
        console.log("Starting bot.");
        this.database.start();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        this.login(this.config.auth.token);
        this.config.auth = {databaseUrl: '', token: ''};
        console.log("Loaded end. Loaded commands: " + this.commandHandler.modules.size)
    }

    public static async userPermission(id:string, perm:string):Promise<boolean> {
        let user = await User.findByDiscID(id);
        if (user != null) {
            return user.hasPermission(perm);
        } else {
            return false;
        }
    }


}
