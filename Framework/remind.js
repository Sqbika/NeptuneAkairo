let client;

function setup(cli) {
	client = cli;
}

function checkReminds() {
	client.sqbika.REMINDS.sync().then(() => {
		client.sqbika.REMINDS.findAll().then(res => res.forEach((elem, ind) => {
			if (elem.When - new Date() < 0) {
				client.channels.get(elem.Where).sendMessage("Whoops, I forgot to bring this pudding to you <@!" + elem.Who + ">! Sorry!\n I was late of *" + client.sqbika.helper.forHumans((Date.now() - elem.When) / 1000) + "*\nReminding you of \`" + elem.What + "\`");
				client.sqbika.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
			} else if (elem.When - new Date() < 5000) {
				setTimeout(function() { remind(client, elem.What, elem.Where, elem.Who) }, (elem.When - new Date()));
				client.sqbika.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
			} 
		}));
	});
}

function remind(client, what, where, who) {
	client.channels.get(where).sendMessage("**Brought your pudding <@!" + who + ">!**\nIt has something written on it:\n\`\`\`\n" + what + "\n\`\`\`");
}

module.exports = {checkReminds, setup, remind };