require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
// const morgan = require('morgan');
const bodyParser = require('body-parser');

// KALIJAGA APPS
const authRoutes = require('./routes/kalijaga_apps/auth');
const userRoutes = require('./routes/kalijaga_apps/user');
const userDataRoutes = require('./routes/kalijaga_apps/user_data');
const dawuhRoutes = require('./routes/kalijaga_apps/dawuh');
const ziarohRoutes = require('./routes/kalijaga_apps/ziaroh');

// KALIJAGA RELIGI
const menuRoutes = require('./routes/kalijaga_religi/menu');
const submenuRoutes = require('./routes/kalijaga_religi/submenu');
const kategoriRoutes = require('./routes/kalijaga_religi/kategori');
const judulRoutes = require('./routes/kalijaga_religi/judul');

app.use('/public', express.static(path.join(__dirname, 'public')));

// SETUP CORS ORIGIN

// app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true}));

app.use(cors());

// SET BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// SETTING ENDPOINT ROUTER

// KALIJAGA APPS
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/userdata', userDataRoutes);
app.use('/dawuh', dawuhRoutes);
app.use('/ziaroh', ziarohRoutes);

// KALIJAGA RELIGI
app.use('/menu', menuRoutes);
app.use('/submenu', submenuRoutes);
app.use('/kategori', kategoriRoutes);
app.use('/judul', judulRoutes);

app.get('/', (req, res)=> res.status(200).json({
    message: 'SELAMAT DATANG DI API MIZAB APPS'
}));

module.exports = app;