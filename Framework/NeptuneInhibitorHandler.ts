import {AkairoHandlerOptions, InhibitorHandler, InhibitorOptions} from "discord-akairo";
import {NeptuneClient} from "./NeptuneClient";

export class NeptuneInhibitorHandler extends InhibitorHandler {

    public constructor(client: NeptuneClient, options: AkairoHandlerOptions) {
        super(client, options);

    }

}
