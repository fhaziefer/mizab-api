require('dotenv').config();

const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

//INISIALISASI MODEL YANG DIJOINKAN KE TABEL UTAMA
const alamat = require('./alamat');
const contacts = require('./contacts');
const nilai = require('./nilai');

// DEFINE ISI DATABASE MENJADI MODEL
var user_data = db.define('user_data',
{
    user_data_id: {type:Sequelize.STRING, primaryKey:true},
    nama: Sequelize.STRING,
    wali: Sequelize.STRING,
    bagian: Sequelize.STRING,
    kamar: Sequelize.STRING,
    tgl_lahir: Sequelize.STRING,
    bio: Sequelize.STRING,
    khidmah: Sequelize.STRING,
    alamat_id: Sequelize.STRING,
    contact_id: Sequelize.STRING,
    nilai_id: Sequelize.STRING,
    status: Sequelize.STRING,
    avatar: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
},{
    // SUPAYA NAMA TABEL TIDAK BERUBAH KETIKA BERISI BANYAK (CONTOH CONTAC MENJADI CONTACTS)
    freezeTableName: true,
    // MEMATIKAN FITUR TIMESTAMP AUTO UPDATE KETIKA DI MYSQL SUDAH DISETTING AUTO UPDAT
    timestamps: false
});

// INISIALISASI JOIN TABLE ONE TO ONE DARI TABEL user_data KE TABEL ALAMAT
user_data.hasOne(alamat, { foreignKey: 'alamat_id'});
user_data.belongsTo(alamat, { foreignKey: 'alamat_id'});

// INISIALISASI JOIN TABLE ONE TO ONE DARI TABEL user_data KE TABEL CONTACT
user_data.hasOne(contacts, {foreignKey: 'contact_id'});
user_data.belongsTo(contacts, {foreignKey: 'contact_id'});

// INISIALISASI JOIN TABLE ONE TO ONE DARI TABEL user_data KE TABEL NILAI
user_data.hasOne(nilai, {foreignKey: 'nilai_id'});
user_data.belongsTo(nilai, {foreignKey: 'nilai_id'});

// MENGHILANGKAN ATTRIBUT TABEL ID YANG SUDAH DIGANTIKAN DENGAN CUSTOM TABEL ID 
user_data.removeAttribute('id');

// EXPORT MODEL KE INDEX
module.exports = user_data;