const {
    Command
} = require('discord-akairo');
const path = require('path');
const fs = require('fs');
const snekfetch = require('snekfetch');

module.exports = class WikiCommand extends Command {
    constructor() {
        super('wiki', {
            aliases: ['wiki'],
            description: 'Edits a wiki page. (TEST)',
            ownerOnly: true,
            protected: true,
            args: [{
                id: 'text',
                match: 'rest'
            }]
        });
    }

    exec(msg, {
        text
    }) {
        snekfetch.post('https://wiki.gamedetectives.net/api.php?&action=edit&title="User:Sqbika/sandbox"&section=new&summary=Sajt&bot=true', {data: {token: "5aa5e4fa63d673af4849b0a09f9c301c5b1336eb"}})
        .then(res => { 
            msg.reply(res.body.toString());
            console.log(res.body.toString());
        });
    }
};

