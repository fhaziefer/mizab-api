const Sequelize = require('sequelize');
const db2 = require('../../config/database/mysql2');

//INISIALISASI JOIN
const submenu = require('./submenu');

var menu = db2.define('menu',
{
    menu_id: {type:Sequelize.INTEGER, primaryKey:true},
    nama_menu: Sequelize.STRING,
},{
    freezeTableName: true,
    timestamps: false
});

menu.hasMany(submenu, {foreignKey: 'menu_id'});
submenu.belongsTo(menu, {foreignKey: 'menu_id'});

submenu.removeAttribute('id');
module.exports = menu;