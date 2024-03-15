require('dotenv').config();

const Sequelize = require('sequelize');

const db2 = new Sequelize(
    process.env.DB2, 
    process.env.USERDB,
    process.env.PASSWORD,
    {
      dialect: process.env.DIALECT,
      host: process.env.HOST,
      logging: false
});

db2
  .authenticate()
  .then(() => {
    console.log(`${process.env.DB2} OK`);
  })
  .catch(err => {
    console.error('NOT OK', err);
  });

module.exports = db2;