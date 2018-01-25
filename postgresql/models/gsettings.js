const Sequelize = require('sequelize');

const Database = require('../postgresql');

const database = new Database();

let GSETTINGS = database.db.define('gsettings', {
	Variable: { type: Sequelize.STRING },
	Value: { type: Sequelize.TEXT },
	Type: { type: Sequelize.STRING }
});

GSETTINGS.sync();

module.exports = GSETTINGS;
