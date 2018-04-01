const {
	Command
} = require('discord-akairo');
const util = require('util');
const exec = util.promisify(require('child_process').execFile);

module.exports = class PullCommand extends Command {
	constructor() {
		super('pull', {
			aliases: ['pull'],
			usage: 'pull',
			description: 'Pulls the update from github.',
			typing: true,
			ownerOnly: true
		});
	}

	async exec(msg) {
		var {
			stdout
		} = await exec('git', ['pull']);
		msg.reply("Updated. Reply:\n```\n" + stdout + "\n```");
	}
};