const { Command } = require('discord-akairo');

class Ping2Command extends Command {
    constructor() {
        super('ping2', {
            aliases: ['ping2']
        });
        console.log("=== PING READY ===");
    }

    /**
     *
     * @param message
     * @param args
     * @returns {Promise<*>}
     */
    async exec(message, args = null) {
        const sent = await message.reply('Pong!');
        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        return sent.edit([
            'Pong!',
            `🔂 **RTT**: ${timeDiff} ms`,
            `💟 **Heartbeat**: ${Math.round(this.client.ping)} ms`
        ]);
    }
}

module.exports = PingCommand;