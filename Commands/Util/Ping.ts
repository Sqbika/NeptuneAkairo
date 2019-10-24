import {NeptuneCommand} from "../../Framework/NeptuneCommand";
import {PERMISSION} from "../../Framework/Enum/PERMISSION";
import {Message} from "discord.js";

export default class Ping extends NeptuneCommand {

    public constructor() {
        super('ping', {
            description: 'Ping-pong command!'
        });
    }

    public exec(msg: Message) {
        msg.channel.send('Pong!').then(mes => {
            var diff = (mes.createdTimestamp) - (msg.createdTimestamp);
            mes.edit(`Pong! :ping_pong:
**Took**: ${diff} ms
**Heartbeat**: ${Math.round(msg.client.ws.ping)} ms`);
        });
    }
}
