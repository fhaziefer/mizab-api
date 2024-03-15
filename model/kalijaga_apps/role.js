const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

var role = db.define('groups',
{
    group_id: {type:Sequelize.STRING, primaryKey:true},
    role: Sequelize.STRING,
},{
    freezeTableName: true,
    timestamps: false
});

role.removeAttribute('id');
module.exports = role;