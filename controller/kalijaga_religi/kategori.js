const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');

controller.getSearch = async function (req, res) {
    const search = req.query.keyword;
    try {
        let kategori = await model.kategori.findAll({
            where: {
                submenu_id : req.params.submenu_id,
                [Op.or]: [{
                    kategori: {
                        [Op.like]: '%' +search+ '%'
                    }
                }
            ]
            },
            order: [
                ["kategori_id", "ASC"]
            ]   
        })
        let count = kategori.length;
        if (kategori.length > 0) {
            res.status(200).json({
                message: 'Search kategori',
                data_size: count,
                kategori: kategori
            })
        }else{
            res.status(200).json({
                message: 'Data tidak ditemukan',
                data:[]
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getAll = async function(req, res) {
    try {
        let kategori= await model.kategori.findAll({

            include: [
                {model: model.judul}
            ],

            where:{
                submenu_id: req.params.submenu_id
            },

            order: [
              [model.judul, "judul_id", "ASC"],
              ["kategori_id", "ASC"]
            ]
        })
        let count = kategori.length;
            if (kategori.length > 0) {
                res.status(200).json({
                    message: 'Get All data kategori',
                    data_size: count,
                    kategori: kategori
                })
            }else{
                res.status(200).json({
                    message: 'Data tidak ditemukan',
                    data:[]
                })
            }
    }catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getOne = async function(req,res) {
    try {
        let kategori = await model.kategori.findOne({
            where: {
                kategori_id: req.params.kategori_id
            },

            include: [
                {model: model.judul, order: ["judul_id", 'ASC']}
            ]
        })
        if (kategori) {
            res.status(200).json({
                message: 'Data ditemukan',
                kategori: kategori
            })
        }else{
            res.status(200).json({
                message: 'Data tidak ditemukan',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;