const { Command } = require('discord-akairo');
const exec = require('child_process').execFile;

module.exports = class PullCommand extends Command {
	constructor() {
		super('pull', {
			aliases: ['pull'],
			usage: 'pull',
            description: 'Pulls the update from github.',
            typing: true
        });
	}

	async exec(msg) {
        exec('git pull', (err, stdout, stderr) => {
            msg.reply('Updated. Response:\n```\n' + stdout + '\n```');
        })
	}
};
