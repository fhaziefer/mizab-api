
//KALIJAGA APPS INDEX CONTROLLER


// KALIJAGA APPS
const auth = require('./kalijaga_apps/auth');
const user = require('./kalijaga_apps/user');
const user_data = require('./kalijaga_apps/user_data');
const dawuh = require('./kalijaga_apps/dawuh');
const ziaroh = require('./kalijaga_apps/ziaroh');

//KALIJAGA RELIGI
const menu = require('./kalijaga_religi/menu');
const submenu = require('./kalijaga_religi/submenu');
const kategori = require('./kalijaga_religi/kategori');
const judul = require('./kalijaga_religi/judul');

const controller = {}

//KALIJAGA APPS
controller.auth = auth;
controller.user = user;
controller.user_data = user_data;
controller.dawuh = dawuh;
controller.ziaroh = ziaroh;

//KALIJAGA RELIGI
controller.menu = menu;
controller.submenu = submenu;
controller.kategori = kategori;
controller.judul = judul;

//EXPORT SEMUA MODULE CONTROLLER
module.exports = controller;