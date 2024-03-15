require('dotenv').config();

const Sequelize = require('sequelize');

const db = new Sequelize(
    process.env.DB1,
    process.env.USERDB,
    process.env.PASSWORD,
    {
      dialect: process.env.DIALECT,
      host: process.env.HOST,
      logging: false
});

db
  .authenticate()
  .then(() => {
    console.log(`${process.env.DB1} OK`);
  })
  .catch(err => {
    console.error('NOT OK', err);
  });

module.exports = db;