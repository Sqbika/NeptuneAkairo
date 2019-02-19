const {
	Command
} = require('discord-akairo');
const fetch = require('node-fetch');
const baseUrl = "https://api.tenderbeta.com/";

module.exports = class TenderCommand extends Command {
	constructor() {
		super('tender', {
			aliases: ['tender'],
			description: 'Tender ARG Command',
			usage: 'tender <subgroup>',
			channelRestriction: 'guild',
			args: [{
                id: 'sub',
                type: ['profile', 'help'],
                match: 'word',
                default: 'help',
                description: {
                    description: 'Tender Plugin sub groups.',
                    usage: '<sub>',
                    examples: ['help', 'sub <profileID(s)>']
                },
                prompt: {
                    retries: 0,
                    start: (msg) => `<@!${msg.author.id}> You provided an invalid subgroup. Valid subgroups: \`help, profile\``,
                },
            }, {
                id: 'rest',
                type: 'rest'
            }]
		});
	}

	async exec(msg, {
		sub, rest
	}) {
        var embed = msg.client.util.embed()
            .setColor(msg.client.config.color)
            .setTimestamp(new Date())
            .setAuthor(msg.author);
		switch (sub) {

            case "profile":
                var data = await getData('profile/list', {
                    player_ids: rest
                }).profiles;
                if (rest.length == 1) {
                    var user = data[0];
                    if (!user.has_completed_profile)
                        return msg.reply("UserID Invalid / Not used yet. IF you think this is an error, ping Sqbika about it.");
                    return embed
                        .setTitle('Profile of ' + user.username)
                        .addField('Status.', user.status_share_sentence)
                        .addField('Level / [XP, XP to levelup]', user.level + " / [" + user.xp + "," + user.xp_to_next_level + "]")
                        .addField('Bio', user.bio)
                } else {
                    embed
                        .setTitle('Requested Profiles.');
                    data.forEach((e) => {
                        embed.addField(e.username, [
                            'Status: ' + e.status_share_sentence,
                            'Level / [XP, XP to levelup]:' + e.level + " / [" + e.xp + "," + e.xp_to_next_level + "]",
                            'Bio (Short): ' + user.bio.substring(0, 100)
                        ].join('\n'))
                    })
                    return embed;
                }
                break;
            case "help":
            default:
                return msg.reply("All avaliable sub-groups for Tender:\n" + [
                    '`help` - Shows this message',
                    '`profile` - Shows the profile of the provided ID'
                ].join('\n'));
                break;
        }
	}
};

function toBody(input) {
	var keys = Object.keys(input);
	var values = Object.values(input);
	for (var i = 0; i < keys.length; i++) {
		if (Array.isArray(values[i])) {
			var val = escape(keys[i]);
			var arrVals = values[i];
			delete(values[i]);
			delete(keys[i]);
			for (var j = 0; j < arrVals.length; j++) {
				keys.push(val + "[]");
				values.push(escape(arrVals[j]));
			}
		} else {
			keys[i] = escape(keys[i]);
			values[i] = escape(values[i]);
		}
	}
	return String(keys.map((e, ind) => e + "=" + values[ind]).join('&'));
}



function escape(input) {
	const letters = "ABCEDFGIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-=.";
	return String(input).split('').map((char) => {
		return (letters.indexOf(char) == -1) ?
			'%' + char.charCodeAt(0).toString(16)
		:
			char;
	}).join('');
}

async function getData(url, body) {
    var a = await fetch(baseUrl + url, {
	"credentials":"omit",
	"headers":{
			"accept":"application/json",
			"accept-language":"en-US,en;q=0.9",
			"content-type":"application/x-www-form-urlencoded",
			"agent": "Sqbika - NodeJS Atlas Discord Bot"
	},
	"body":toBody(body),
	"method":"POST",
    "mode":"cors"});
    return await a.json();
}