const jp = require('fs-jetpack');
const util = require('util');

function isDM(msg) {
	return msg.channel.type == 'dm';
}

function getJSON() {
	return jp.read('/home/sqbika/Bots/Neptunev11/jsons/notify.json', 'json');
}

function writeJSON(json) {
	jp.write('/home/sqbika/Bots/Neptunev11/jsons/notify.json', json);
}

function cleanRegex (input) {
	return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function regexFactory(word) {
	return cleanRegex(word);
}

function cleanChannel(input) {
	return input.replace(/[<#>]/g, '');
}

function regexFactories(words) {
	return words.map((e) => cleanRegex(e)).join('');
}

function channelExists(client, chan) {
	return client.channels.has(chan)
}

function gibRegex(input) {
	if (util.isArray(input)) {
		return regexFactories(input);
	} else {
		return regexFactory(input);
	}
}

function enableN(msg, id) {
	var file = getJSON();
	if (isDM(msg)) {
		return "Cannot Enable Notify in a DM channel";
	} else {
		if (file[msg.author.id] == undefined) {
			return "No Notify have been set up yet.";
		} else {
			if (file[msg.author.id][id] == undefined) {
				return "No Notify have been found with that id.";
			} else {
				file[msg.author.id][id].enabled = true;
				return "Notify with ID: [" + id + "] has been enabled.";
			}
		}
	}
}

function disableN(msg, id) {
	var file = getJSON();
	if (isDM(msg)) {
		return "Cannot Disable Notify in a DM channel";
	} else {
		if (file[msg.author.id] == undefined) {
			return "No Notify have been set up yet.";
		} else {
			if (file[msg.author.id][id] == undefined) {
				return "No Notify have been found with that id.";
			} else {
				file[msg.author.id][id].enabled = false;
				return "Notify with ID: [" + id + "] has been disabled.";
			}
		}
	}
}

function addWordNotify(msg, word, channel) {
	var file = getJSON();
	var regex = gibRegex(word);
	if (isDM(msg)) {
		return "Cannot Add Notify in a DM channel";
	} else {
		if (channel == "anywhere" || (channelExists(msg.client, cleanChannel(channel)))) {
			if (file[msg.author.id] == undefined) {
				file[msg.author.id] = {
					ID: 0,
					pins: {},
					words: {}
				};
				file[msg.author.id]["words"][file[msg.author.id].ID] = {
					word: regex,
					enabled: true,
					channel: cleanChannel(channel),
					guild: msg.guild.id
				}
				file[msg.author.id].ID += 1;
				writeJSON(file);
				return "Added and enabled Notify, with word \`" + word +"\` in " + channel +".";
			} else {
				file[msg.author.id]["words"][file[msg.author.id].ID] = {
					word: regex,
					enabled: true,
					channel: cleanChannel(channel),
					guild: msg.guild.id
				}
				file[msg.author.id].ID += 1;
				writeJSON(file);
				return "Added and enabled Notify, with word \`" + word +"\` in " + channel +".";
			}
		}	else {
			return "Please use Channel ID or Mention instead of channel name.";
		}
	} 
}

function addPinNotify(msg, channel) {
	var file = getJSON();
	if (isDM(msg)) {
		return "Cannot Add Notify in a DM channel";
	} else {
		if ( channel == "anything" || (channelExists(msg.client, cleanChannel(channel)))) {
			if (file[msg.author.id] == undefined) {
				file[msg.author.id] = {
					ID: 0,
					pins: {},
					words: {}
				};
				file[msg.author.id]["pins"][file[msg.author.id].ID] = {
					enabled: true,
					channel: cleanChannel(channel),
					guild: msg.guild.id
				}
				file[msg.author.id].ID += 1;
				writeJSON(file);
				return "Added and enabled Pin Notify in " + channel +".";
			} else {
				file[msg.author.id]["pins"][file[msg.author.id].ID] = {
					enabled: true,
					channel: cleanChannel(channel),
					guild: msg.guild.id
				}
				file[msg.author.id].ID += 1;
				writeJSON(file);
				return "Added and enabled Pin Notify in " + channel +".";
			}
		}	else {
			return "Please use Channel ID or Mention instead of channel name.";
		}
	} 
}

function removeWordNotify(msg, id) {
	var file = getJSON();
	if (isDM(msg)) {
		return "Cannot Remove Notify in a DM channel";
	} else {
		if (file[msg.author.id] == undefined) {
			return "No Notify haven't been set up, so nothing to delete.";
		} else {
			if (file[msg.author.id]["words"][id] !== undefined) {
				delete file[msg.author.id]["words"][id];
				writeJSON(file);
				return "Deleted Notify.";
			} else {
				return "No Notify have been found with that ID.";
			}
		}
	}
}

function removePinNotify(msg, id) {
	var file = getJSON();
	if (isDM(msg)) {
		return "Cannot Remove Notify in a DM channel";
	} else {
		if (file[msg.author.id] == undefined) {
			return "No Notify haven't been set up, so nothing to delete.";
		} else {
			if (file[msg.author.id]["pins"][id] !== undefined) {
				delete file[msg.author.id]["pins"][id];
				writeJSON(file);
				return "Deleted Notify.";
			} else {
				return "No Notify have been found with that ID.";
			}
		}
	}
}

function logUser(user) {
	return `${user.username}#${user.discriminator} / ${user.id}`;
}

function checkWordNotify(msg) {
	if (!isDM(msg) && msg.author.id !== "200965221131485184") {
		var file = getJSON();
		Object.keys(file).forEach((ele, ind) => {
			if (userHasNotify(file[ele], msg) && msg.author.id !== ele) {
				msg.client.users.get(ele).send("**Word Notification**\n\n<@" + msg.author.id + "> [\`" + logUser(msg.author) + "\`] said this in <#" + msg.channel.id + "> :\n\`\`\`\n" + msg.content + "\n\`\`\`");  
			}
		});
	}
}

function checkPinNotify(channel) {
	if (channel.type !== 'dm') {
		var file = getJSON();
		Object.keys(file).forEach((ele, ind) => {
			if (userHasPinNotify(file[ele], channel)) {
				channel.client.users.get(ele).send("**Pin Notification**\n\nPin happened in <#" + channel.id + ">");  
			}
		});
	}
}

function userHasNotify(user, input) {
	var yes = false;
	Object.keys(user["words"]).forEach((ele, ind) => {
		if (user["words"][ele].enabled && user["words"][ele].guild == input.guild.id) {
			if (new RegExp(user["words"][ele].word, "ig").test(input.content) && (user["words"][ele].channel == "anywhere" || user["words"][ele].channel == input.channel.id)) {
				yes = true;
			}
		}
	});
	return yes;
}

function userHasPinNotify(user, channel) {
	var yes = false;
	Object.keys(user["pins"]).forEach((ele, ind) => {
		if (user["pins"][ele].enabled && user["pins"][ele].guild == channel.guild.id) {
			if ((user["pins"][ele].channel == "anywhere" || user["pins"][ele].channel == channel.id)) {
				yes = true;
			}
		}
	});
	console.log(yes);
	return yes;
}

function listNotifies(msg) {
	
	if (isDM(msg)){
		return "You can't list Notifies in DM.";
	} else {
		var file = getJSON();
		if (file[msg.author.id] == undefined) {
			return "You haven't set up any notifiers.";
		}
	return `
**List of Notifies**:

*Word Notifies*:
ID | Word(s) | Enabled? | Channel
\`\`\`
${wordStringResolve(msg, file)}
\`\`\`

*Pin Notifies*:
ID | Enabled? | Channel
\`\`\`
${pinStringResolve(msg, file)}

\`\`\`
`
}
}

function wordStringResolve(msg, file) {
	var a = getWordString(msg, file);
	return a.length == 0 ?  "No Word Notifiers has been set up." :  a
}

function pinStringResolve(msg, file) {
	var a = getPinString(msg, file);
	return a.length == 0 ? "No Pin Notifiers has been set up." : a
}

function getPinString(msg, file) {
	return Object.keys(file[msg.author.id]["pins"]).map((ele) => { if (file[msg.author.id]["pins"][ele].guild == msg.guild.id) { return ele + " | " + file[msg.author.id]["pins"][ele].enabled + " | " + (file[msg.author.id]["pins"][ele].channel == "anywhere" ? "Anywhere" : "<#" + file[msg.author.id]["pins"][ele].channel +">") }}).join('\n')
}

function getWordString(msg, file) {
	return Object.keys(file[msg.author.id]["words"]).map((ele) => { if (file[msg.author.id]["words"][ele].guild == msg.guild.id) { return ele + " | " + cleanRegex(file[msg.author.id]["words"][ele].word) + " | " + file[msg.author.id]["words"][ele].enabled + " | " + (file[msg.author.id]["words"][ele].channel == "anywhere" ? "Anywhere" : "<#" + file[msg.author.id]["words"][ele].channel +">") }}).join('\n')
}


module.exports = { enableN, disableN, addWordNotify, addPinNotify, removeWordNotify, removePinNotify, checkWordNotify, checkPinNotify, listNotifies};





