const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');

controller.getSearch = async function (req, res) {
    const search = req.query.keyword;
    try {
        let judul = await model.judul.findAll({
            where: {
                kategori_id : req.params.kategori_id,
                [Op.or]: [{
                    judul: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    judul_arab : {
                        [Op.like]: '%' +search+ '%'
                    }
                }
            ]
            },
            order: [
                ["judul_id", "ASC"]
            ]   
        })
        let count = judul.length;
        if (judul.length > 0) {
            res.status(200).json({
                message: 'Search Judul',
                data_size: count,
                judul: judul
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
        let judul= await model.judul.findAll({

            include: [
                {model: model.isi}
            ],

            where:{
                kategori_id: req.params.kategori_id
            },

            order: [
              ["judul_id", "ASC"],
              [model.isi, "isi_id", "ASC"]
            ]
        })
        let count = judul.length;
            if (judul.length > 0) {
                res.status(200).json({
                    message: 'Get All data Judul',
                    data_size: count,
                    data: judul
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
        let judul = await model.judul.findOne({
            where: {
                judul_id: req.params.judul_id
            },

            include: [
                {model: model.isi, order: ["isi_id", 'ASC']}
            ]
        })
        if (judul) {
            res.status(200).json({
                message: 'Data ditemukan',
                judul: judul
            })
        }else{
            res.status(400).json({
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