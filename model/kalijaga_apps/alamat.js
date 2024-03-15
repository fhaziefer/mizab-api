const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

var alamat = db.define('alamat',
{
    alamat_id: {type:Sequelize.STRING, primaryKey:true},
    alamat: Sequelize.STRING,
    desa: Sequelize.STRING,
    kecamatan: Sequelize.STRING,
    kota: Sequelize.STRING,
    provinsi: Sequelize.STRING,
    kode_pos: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
},{
    freezeTableName: true,
    timestamps: false
});

alamat.removeAttribute('id');
module.exports = alamat;