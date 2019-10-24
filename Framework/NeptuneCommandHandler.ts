import {CommandHandler, CommandHandlerOptions} from "discord-akairo";
import {NeptuneClient} from "./NeptuneClient";

export class NeptuneCommandHandler extends CommandHandler {

    public client!: NeptuneClient;

    public constructor(client: NeptuneClient, handlerOptions: CommandHandlerOptions) {
        super(client, handlerOptions);
    }
}
