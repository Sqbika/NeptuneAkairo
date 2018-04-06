const {
	Command
} = require('discord-akairo');
const moment = require('moment');

module.exports = class PinMessageCommand extends Command {
	constructor() {
		super('pinmessage', {
			aliases: ['pinmessage', 'pim'],
			usage: 'pim <sub> <arg> <text>',
			description: 'Sets an ARGs channel.',
			channelRestriction: 'guild',
			args: [{
                id: 'sub',
                type: [['waitingfor', 'wf', 'waiting', 'wfor'], ['whathappened', 'wh', 'happened', 'happen'], ['waitingfordate', 'wfd', 'waitingfd']],
                prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please choose which one you want to update: **waitingfor**, **whathappened** or **waitingfordate**`,
					retry: (msg) => `<@!${msg.author.id}> Please choose either **waitingfor**, **whathappened** or **waitingfordate**`
				},
                description: 'The sub between updating waitingfor, whathappened and waitingfordate',
                usage: '<waitingfor,wf,waiting,wfor>, <whathappened,wh,happened,happen> or <waitingfordate,wfd,waitingfd>'
            },{
				id: 'arg2',
				type: (word, msg) => Object.keys(msg.client.settings.get(msg.guild.id, 'args')).indexOf(word) !== -1 ? true : undefined,
				prompt: {
					retries: 2,
					start: (msg) => `<@!${msg.author.id}> Please provide a name for the ARG to set the main channel.`,
					retry: (msg) => `<@!${msg.author.id}${`> Please provide **ONLY** an existing ARG to set the main channel. ARGs: \`${Object.keys(msg.client.settings.get(msg.guild.id, 'args')).join(', ')}\``}`
				},
				description: 'An ARG Name, which is in the database.',
				usage: '<string>'
			}, {
                id: 'text',
                match: 'rest',
                prompt: {
                    start: (msg) => `<@!${msg.author.id}> Please provide the text you want to update the pin with.`
                },
                description: 'The text that will update the pinMessage.\nThe date can be these: Exact date (2017 04 10 12:00:00) or time from now (5day4hour / <0mo1w2d3h4m5s>)',
				usage: '<string:rest>'
            }]
		});
	}

	userPermissions(msg) {
		return msg.client.Permissions.ARGPermission(msg);
	}

    async exec(msg, { sub, arg2, text }) {
        var arg = msg.client.settings.get(msg.guild.id, 'args')[arg2];
        var pinMessage = arg['pinMessage'];
        if (typeof pinMessage == "undefined") {
            pinMessage = {
                id: 0,
                arg: arg2,
                msgID: 0,
                channel: arg.channel,
                whatHappened: {
                    text: "Nothing.",
                    date: new Date().toString()
                },
                waitingFor: {
                    text: "Nothing.",
                    date: new Date().toString()
                }
			}
			console.log("Switch: " + sub);
            switch(sub) {
                case "waitingfor":
                    pinMessage.waitingFor.text = text;
                    break;
                case "whathappened":
                    pinMessage.whatHappened.text = text;
                    pinMessage.whatHappened.date = new Date().toString();
                    break;
                case "waitingfordate":
                    var parsedTime = moment(text);
                    if (!parsedTime.isValid()) {
                        parsedTime = moment(parseUgly(text).absolute);
                        if (parsedTime == false)
                            msg.reply("Couldn't parse date format.");
                            break;
					}
					console.log(parsedTime);
                    pinMessage.waitingFor.date = parsedTime.toDate().toString();
                    break;
            }
            msg.client.pinMessage.addMessage(pinMessage);
        }
        switch(sub) {
            case "waitingfor":
                pinMessage.waitingFor.text = text;
                break;
            case "whathappened":
                pinMessage.whatHappened.text = text;
                pinMessage.whatHappened.date = new Date().toString();
                break;
            case "waitingfordate":
                var parsedTime = moment(text);
                if (!parsedTime.isValid()) {
                    parsedTime = moment(parseUgly(text).absolute);
                    if (parsedTime == false)
                            msg.reply("Couldn't parse date format.");
                            break;
                }
                pinMessage.waitingFor.date = parsedTime.toDate().toString();
                break;
        }
        msg.client.pinMessage.updateMessage(pinMessage);
        msg.reply("Added and updated PinMessage. Will show up in a few seconds.").then(res => res.delete(5000));
	}
};


//Source: Zephy
function parseUgly(timeout) {
	timeout = timeout.replace(/\s+/g, '');
	var SECONDS = /(\d+) *(?:seconds|seconds|sec|s)/i;
	var MINUTES = /(\d+) *(?:minutes|minute|min|m)/i;
	var HOURS = /(\d+) *(?:hours|hour|h)/i;
	var DAYS = /(\d+) *(?:days|days|d)/i;
	var WEEKS = /(\d+) *(?:weeks|week|w)/i;


	var delta = 0;

	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var days = 0;
	var years = 0;
	var weeks = 0;

	var ss = SECONDS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1];
		seconds += +ss[1];
	}

	ss = MINUTES.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60;
		minutes += +ss[1];
	}

	ss = HOURS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60;
		hours += +ss[1];
	}

	ss = DAYS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60 * 24;
		days += +ss[1];
	}

	ss = WEEKS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60 * 24 * 7;
		days += +ss[1];
	}

	if(isNaN(hours + minutes + seconds) || delta < 1) return false;
	return {
		absolute: new Date().getTime() + (delta * 1000),
		relative: delta * 1000,
		seconds: seconds,
		minutes: minutes,
		hours: hours,
		days: days,
		weeks: weeks,
		years: years,
		delta: delta
	};
}