const Sequelize = require('sequelize');

const Database = require('../postgresql');

const database = new Database();

let DBMSG = database.db.define('dbmsg', {
	Time: { type: Sequelize.BIGINT },
	Author: { type: Sequelize.BIGINT },
	Content: { type: Sequelize.STRING },
	Channel: { type: Sequelize.BIGINT },
	Server: { type: Sequelize.BIGINT }
});

DBMSG.sync();

module.exports = DBMSG;
