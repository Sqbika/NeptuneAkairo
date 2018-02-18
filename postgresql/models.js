const Sequelize = require('sequelize');

const Database = require('./postgresql');

const database = new Database();

let REMINDS = database.db.define('reminds', {
	Where: { type: Sequelize.STRING },
	When: { type: Sequelize.DATE },
	What: { type: Sequelize.TEXT },
	Who: { type: Sequelize.BIGINT }
});

let SETTINGS = database.db.define('settings', {
	Guild: { type: Sequelize.BIGINT },
	JSON: { type: Sequelize.JSONB }
});


REMINDS.sync();
SETTINGS.sync();

module.exports = { REMINDS, SETTINGS };
