const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

var ziaroh_bio = db.define('ziaroh_bio',
{
    biografi_id: {type:Sequelize.STRING, primaryKey:true},
    ziaroh_id: Sequelize.STRING,
    bio: Sequelize.STRING
},{
    freezeTableName: true,
    timestamps: false
});

ziaroh_bio.removeAttribute('id');
module.exports = ziaroh_bio;