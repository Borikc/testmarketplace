const pgp = require('pg-promise')();
const DATABASE_URL = "postgresql://postgres:159159159@localhost/rus-marketpalce";
const connection = pgp(DATABASE_URL);

module.exports = connection;
