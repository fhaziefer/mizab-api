const Sequelize = require('sequelize');
const db2 = require('../../config/database/mysql2');

//INISIALISASI JOIN
const isi = require('./isi');

var judul = db2.define('judul',
{
    judul_id: {type:Sequelize.INTEGER, primaryKey:true},
    judul: Sequelize.STRING,
    judul_arab: Sequelize.STRING,
    sub_judul: Sequelize.STRING
},{
    freezeTableName: true,
    timestamps: false
});

judul.hasMany(isi, {foreignKey: 'judul_id'});
isi.belongsTo(judul, {foreignKey: 'judul_id'});

judul.removeAttribute('id');
module.exports = judul;