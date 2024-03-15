const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');

controller.getSearch = async function (req, res) {
    const search = req.query.keyword;
    try {
        let submenu = await model.submenu.findAll({
            where: {
                menu_id : req.params.menu_id,
                [Op.or]: [{
                    submenu: {
                        [Op.like]: '%' +search+ '%'
                    }
                }
            ]
            },
            order: [
                ["submenu_id", "ASC"]
            ]   
        })
        let count = submenu.length;
        if (submenu.length > 0) {
            res.status(200).json({
                message: 'Search submenu',
                data_size: count,
                submenu: submenu
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
        let submenu= await model.submenu.findAll({

            include: [
                {model: model.kategori}
            ],

            where:{
                menu_id: req.params.menu_id
            },

            order: [
              [model.kategori, "kategori_id", "ASC"],
              ["submenu_id", "ASC"]
            ]
        })
        let count = submenu.length;
            if (submenu.length > 0) {
                res.status(200).json({
                    message: 'Get All data submenu',
                    data_size: count,
                    submenu: submenu
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
        let submenu = await model.submenu.findOne({
            where: {
                submenu_id: req.params.submenu_id
            },

            include: [
                {model: model.kategori, order: ["kategori_id", 'ASC']}
            ]
        })
        if (submenu) {
            res.status(200).json({
                message: 'Data ditemukan',
                submenu: submenu
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