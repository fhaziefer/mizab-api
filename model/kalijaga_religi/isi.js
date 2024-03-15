const Sequelize = require('sequelize');
const db2 = require('../../config/database/mysql2');

var isi = db2.define('isi',
{
    isi_id: {type:Sequelize.INTEGER, primaryKey:true},
    judul_id: Sequelize.INTEGER,
    isi: Sequelize.TEXT
},{
    freezeTableName: true,
    timestamps: false
});

isi.removeAttribute('id');
module.exports = isi;