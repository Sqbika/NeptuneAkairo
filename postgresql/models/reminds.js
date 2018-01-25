const Sequelize = require('sequelize');

const Database = require('../postgresql');

const database = new Database();

let REMINDS = database.db.define('reminds', {
	Where: { type: Sequelize.STRING },
	When: { type: Sequelize.DATE },
	What: { type: Sequelize.TEXT },
	Who: { type: Sequelize.BIGINT }
});

REMINDS.sync();

module.exports = REMINDS;
