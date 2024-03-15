
// KALIJAGA APPS
// DATA USER
const user = require('./kalijaga_apps/user');
const role = require('./kalijaga_apps/role');
const normalDate = require('./kalijaga_apps/normalDate');

// ZIAROH
const ziaroh = require('./kalijaga_apps/ziaroh');
const ziaroh_bio = require('./kalijaga_apps/ziaroh_bio');
const ziaroh_catatan = require('./kalijaga_apps/ziaroh_catatan');

// DATA DIRI
const user_data = require('./kalijaga_apps/user_data');
const alamat = require('./kalijaga_apps/alamat');
const contacts = require('./kalijaga_apps/contacts');
const nilai = require('./kalijaga_apps/nilai');
const dawuh = require('./kalijaga_apps/dawuh');

// KALIJAGA RELIGI
const menu = require('./kalijaga_religi/menu');
const submenu = require('./kalijaga_religi/submenu');
const kategori = require('./kalijaga_religi/kategori');
const judul = require('./kalijaga_religi/judul');
const isi = require('./kalijaga_religi/isi');

// CONSTRUCT MODEL
const model = {};

// KALIJAGA APPS
// DATA USER
model.user = user;
model.role = role;
model.normalDate = normalDate;

// ZIAROH
model.ziaroh = ziaroh;
model.ziaroh_bio = ziaroh_bio;
model.ziaroh_catatan = ziaroh_catatan;

// DATA DIRI
model.user_data = user_data;
model.alamat = alamat;
model.contacts = contacts;
model.nilai = nilai;

// KALIJAGA RELIGI DATA
model.menu = menu;
model.submenu = submenu;
model.kategori = kategori;
model.judul = judul;
model.isi = isi;
model.dawuh = dawuh;

// EXPORT ALL MODEL
module.exports = model;