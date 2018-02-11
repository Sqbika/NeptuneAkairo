const { AkairoClient } = require('discord-akairo');

class NeptuneClient extends AkairoClient {
    constructor() {
        suprt({
            ownerID: config.ownerID,
	        prefix: config.prefix,
	        allowMention: true,
	        commandDirectory: config.commandDirectory,
	        inhibitorDirectory: config.inhibitorDirectory,
	        listenerDirectory: config.listenerDirectory,
	        disableEveryone: true,
	        disabledEvents: ['TYPING_START']
        })
    }
}