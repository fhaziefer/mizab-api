const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

var contacts = db.define('kontak',
{
    contact_id: {type:Sequelize.STRING, primaryKey:true},
    phone: {type:Sequelize.STRING, validate: {isAlphanumeric: true}},
    instagram: Sequelize.STRING,
    email: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
},{
    freezeTableName: true,
    timestamps: false
});

contacts.removeAttribute('id');
module.exports = contacts;