const Sequelize = require('sequelize');
const Auth = require('./auth.json');

class Database {
	constructor() {
		this.database = new Sequelize(Auth.postgresPath, { logging: false });
	}

	get db() {
		return this.database;
	}

	start() {
		this.database.authenticate()
			.then(() => { console.log(`Database has been initialized.`); })
			.catch(err => { console.log(`Unable to connect to the database: ${err}`); });
	}
}

module.exports = Database;
