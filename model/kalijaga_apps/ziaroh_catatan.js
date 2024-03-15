const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

var ziaroh_catatan = db.define('ziaroh_catatan',
{
    catatan_id: {type:Sequelize.STRING, primaryKey:true},
    perjalanan: Sequelize.STRING,
    tiba: Sequelize.STRING,
    singgah: Sequelize.STRING,
    agenda: Sequelize.STRING,
    kondisi_makam: Sequelize.STRING,
    berangkat: Sequelize.STRING,
    sketsa: Sequelize.STRING,
    catatan: Sequelize.STRING,
    peringatan: Sequelize.STRING,
},{
    freezeTableName: true,
    timestamps: false
});

ziaroh_catatan.removeAttribute('id');
module.exports = ziaroh_catatan;