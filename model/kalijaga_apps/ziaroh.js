require('dotenv').config();

const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

//INISIALISASI MODEL YANG DIJOINKAN KE TABEL UTAMA
const alamat = require('./alamat');
const ziaroh_bio = require('./ziaroh_bio');
const ziaroh_catatan = require('./ziaroh_catatan');

// DEFINE ISI DATABASE MENJADI MODEL
var ziaroh = db.define('ziaroh',
{
    ziaroh_id: {type:Sequelize.STRING, primaryKey:true},
    nama_makam: Sequelize.STRING,
    sub_nama_makam: Sequelize.STRING,
    video_url: Sequelize.STRING,
    avatar: Sequelize.STRING,
    alamat_id: Sequelize.STRING,
    catatan_id: Sequelize.STRING,
    no_urut: Sequelize.INTEGER
},{
    // SUPAYA NAMA TABEL TIDAK BERUBAH KETIKA BERISI BANYAK (CONTOH CONTAC MENJADI CONTACTS)
    freezeTableName: true,
    // MEMATIKAN FITUR TIMESTAMP AUTO UPDATE KETIKA DI MYSQL SUDAH DISETTING AUTO UPDAT
    timestamps: false
});

ziaroh.hasOne(alamat, { foreignKey: 'alamat_id'});
ziaroh.belongsTo(alamat, { foreignKey: 'alamat_id'});

ziaroh.hasMany(ziaroh_bio, {foreignKey: 'ziaroh_id'});
ziaroh_bio.belongsTo(ziaroh, {foreignKey: 'ziaroh_id'});

ziaroh.hasOne(ziaroh_catatan, {foreignKey: 'catatan_id'});
ziaroh.belongsTo(ziaroh_catatan, {foreignKey: 'catatan_id'});

// MENGHILANGKAN ATTRIBUT TABEL ID YANG SUDAH DIGANTIKAN DENGAN CUSTOM TABEL ID 
ziaroh.removeAttribute('id');

// EXPORT MODEL KE INDEX
module.exports = ziaroh;