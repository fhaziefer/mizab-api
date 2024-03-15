const Sequelize = require('sequelize');
const db2 = require('../../config/database/mysql2');

//INISIALISASI JOIN
const judul = require('./judul');

var kategori = db2.define('kategori',
{
    kategori_id: {type:Sequelize.INTEGER, primaryKey:true},
    kategori: Sequelize.STRING,
},{
    freezeTableName: true,
    timestamps: false
});

kategori.hasMany(judul, {foreignKey: 'kategori_id'});
judul.belongsTo(kategori, {foreignKey: 'kategori_id'});

kategori.removeAttribute('id');
module.exports = kategori;