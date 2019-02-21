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
                type: ['profile', 'help', 'test'],
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
                match: 'rest'
            }]
		});
	}

	async exec(msg, {
		sub, rest
	}) {
        var embed = msg.client.util.embed()
            .setColor(msg.client.config.color)
            .setTimestamp(new Date())
        rest = rest.split(' ');
		switch (sub) {

            case "quests":
                var data = await getData('user/get', {
                    token: msg.client.config.tender,
                });
                embed.setTitle('Avaliable Quests')
                embed.setDescription(data.user.inventory.map((e => `[${e.name}] - ${e.item_instance_id == undefined ? 'Locked' : 'Unlocked'} / Type: ${e.item_class}`)))
                return msg.reply({
                    embed: embed
                });

            case "profile":
                var data = await getData('profile/list', {
                    player_ids: rest
                });
                data = data.profiles;
                if (data.length == 1) {
                    var user = data[0];
                    if (!user.has_completed_profile)
                        return msg.reply("UserID Invalid / Not used yet. IF you think this is an error, ping Sqbika about it.");
                    embed
                        .setTitle('Profile of ' + user.username)
                        .addField('Status.', "" + user.status_share_sentence)
                        .addField('Liked / Matched Profiles', user.liked_profiles.length + " / " + user.matched_profiles.length)
                        .addField('Level / [XP, XP to levelup]', user.level + " / [" + user.xp + "," + user.xp_to_next_level + "]")
                        .addField('e_1/2/3/4', [user.e_1, user.e_2, user.e_3, user.e_4].join('/'))
                } else {
                    embed
                        .setTitle('Requested Profiles.');
                    var invalid = [];
                    data.forEach((e) => {
                        if (e.has_completed_profile)
                        embed.addField(e.username, [
                            'Status: ' + e.status_share_sentence,
                            'Level / [XP, XP to levelup]:' + e.level + " / [" + e.xp + "," + e.xp_to_next_level + "]",
                            'Liked / Matched Profiles: ' + e.liked_profiles.length + " / " + e.matched_profiles.length,
                            'e_1/2/3/4:' [user.e_1, user.e_2, user.e_3, user.e_4].join('/')
                        ].join('\n'))
                        else 
                            invalid += e.player_id;
                    })
                    if (invalid.length !== 0)
                        embed.addField("Invalid ids", "These IDs were invalid / not registered yet: " + invalid.join(' '));
                }
                return msg.reply({
                    embed: embed
                });
            case "help":
            default:
                return msg.reply("All avaliable sub-groups for Tender:\n" + [
                    '`help` - Shows this message',
                    '`profile` - Shows the profile of the provided ID'
                ].join('\n'));
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

//fetch("https://api.tenderbeta.com/user/get", {"credentials":"omit","headers":{"accept":"application/json","accept-language":"en-US,en;q=0.9","content-type":"application/x-www-form-urlencoded"},"referrer":"https://app.tenderbeta.com/","referrerPolicy":"no-referrer-when-downgrade","body":"token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.VlN4TXhYekVVcnhzcE9SNDFJT3lhQWJjWSszV1kvdUp1WGtIcnF6WGg2K0xjNjZaZ3B4NlJ5VWY0aVFXYnpXTkJ1Q1V1eFI1SGxTNGlhSkpHZzBnTXBNY004di94WStIaDFSUkRpMWZSbFVmbWsydHJobm9OWXA5UVVSbldYUG5zc2xJaG9SUnVOTHYyNGNDRU1NbG1icGhzcGdtY2NzbWY2azlha2VQS3lQbytHZ2lQeWRaWnFrM3gvRVpTRGNXUTRWbXdYc0JVOTVBZjM5S05obEZGSzIyYTF5TGFmTlNOL3Q4MS9BQWxRSFVpN3NMTmlIcWVCblMrTi8xMkkweU9EUFBsREVyVVNnQlRRTk4wQlJzYWFQdFJrTk42eHZtbitWSU1NQmNxOFdQOXFaWm9INEdIdWwza1hZSGE3dFg0dDBhMWFTelNyeExBeHdYQURtdHRDUzAwbXJhMzNPb0gwTXdNWExBVWNBV2l1L2xzbXZ5U3UweU9nQS9UVXgyU3FqaGlUMnU3NmtHZFo5azR5QXo1RmlHR3ZTeGgvaTM5TS9henhmSUg2a3VFSXZNRnM1UDNIZjZkTi9WcHo5Zw%3D%3D._xQ8nemVpLBlBGMG2UhoRo3kgIozvJbcNabv5GAMctg&token_uuid=5ffb4345-c68a-459b-b02d-83c1d20a0634&token_auth_level=3","method":"POST","mode":"cors"});