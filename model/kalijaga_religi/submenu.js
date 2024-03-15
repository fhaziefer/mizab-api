const Sequelize = require('sequelize');
const db2 = require('../../config/database/mysql2');

//INISIALISASI JOIN
const kategori = require('./kategori');

var submenu = db2.define('submenu',
{
    submenu_id: {type:Sequelize.INTEGER, primaryKey:true},
    submenu: Sequelize.STRING,
},{
    freezeTableName: true,
    timestamps: false
});

submenu.hasMany(kategori, {foreignKey: 'submenu_id'});
kategori.belongsTo(submenu, {foreignKey: 'submenu_id'});

kategori.removeAttribute('id');
module.exports = submenu;