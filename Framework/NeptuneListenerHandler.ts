import {AkairoHandlerOptions, ListenerHandler, ListenerOptions} from "discord-akairo";
import {NeptuneClient} from "./NeptuneClient";

export class NeptuneListenerHandler extends ListenerHandler {

    public constructor(client: NeptuneClient, options: AkairoHandlerOptions) {
        super(client, options);
    }
}
