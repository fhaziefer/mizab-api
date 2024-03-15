const Sequelize = require('sequelize');
const db = require('../../config/database/mysql');

var nilai = db.define('nilai',
{
    nilai_id: {type:Sequelize.STRING, primaryKey:true},
    smt1: Sequelize.INTEGER,
    smt2: Sequelize.INTEGER,
    smt3: Sequelize.INTEGER,
    smt4: Sequelize.INTEGER,
    smt5: Sequelize.INTEGER,
    nilai_rata_rata: Sequelize.INTEGER,
    ubk: Sequelize.INTEGER,
    keaktifan_roan: Sequelize.STRING,
    pengalaman_organisasi: Sequelize.STRING,
},{
    freezeTableName: true,
    timestamps: false
});

nilai.removeAttribute('id');
module.exports = nilai;