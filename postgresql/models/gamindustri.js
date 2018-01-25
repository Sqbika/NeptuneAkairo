const Sequelize = require('sequelize');

const Database = require('../postgresql');

const database = new Database();

let NEPUSR = database.db.define('nepusr', {
	User: { type: Sequelize.BIGINT },
	Region: { type: Sequelize.STRING },
	Coins: { type: Sequelize.BIGINT },
	Daily: { type: Sequelize.BOOLEAN }
});

let NATION = database.db.define('nation', {
	Nation: { type: Sequelize.STRING },
	Share: { type: Sequelize.BIGINT },
	Worshippers: { type: Sequelize.BIGINT }
});

let COMPANIONS = database.db.define('companions', {
	Owner: { type: Sequelize.BIGINT },
	Name: { type: Sequelize.STRING },
	XP: { type: Sequelize.BIGINT },
	Level: { type: Sequelize.INTEGER },
	QDone: { type: Sequelize.INTEGER },
	CurQuest: { type: Sequelize.BIGINT, allowNull: true }
});

let QUESTS = database.db.define('quests', {
	Name: { type: Sequelize.STRING },
	Level: { type: Sequelize.INTEGER },
	XP: { type: Sequelize.BIGINT },
	Channel: { type: Sequelize.BIGINT, allowNull: true },
	DLeft: { type: Sequelize.DATE },
	Time: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
	AcceptedBy: { type: Sequelize.BIGINT, allowNull: true	},
	CompletedOn: { type: Sequelize.DATE, allowNull: true },
	Completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
});

NEPUSR.sync();
NATION.sync();
COMPANIONS.sync();
QUESTS.sync();

module.exports = { NEPUSR, NATION, COMPANIONS, QUESTS };
