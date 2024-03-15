const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');
const  {Sequelize} = require('sequelize')

controller.getSearch = async function (req, res) {
    const search = req.query.keyword;
    try {
        let menu = await model.menu.findAll({
            where: {
                [Op.or]: [{
                    nama_menu: {
                        [Op.like]: '%' +search+ '%'
                    }
                }
            ]
            },
            order: [
                ["menu_id", "ASC"]
            ]   
        })
        let count = menu.length;
        if (menu.length > 0) {
            res.status(200).json({
                message: 'Search menu',
                data_size: count,
                menu: menu
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
        let menu= await model.menu.findAll({

            include: [
                {model: model.submenu}
            ],
            order: [
              [model.submenu, "submenu_id", "ASC"],
              ["menu_id", "ASC"]
            ]
        })
        let count = menu.length;
            if (menu.length > 0) {
                res.status(200).json({
                    message: 'Get All data menu',
                    data_size: count,
                    menu: menu
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
        let menu = await model.menu.findOne({
            where: {
                menu_id: req.params.menu_id
            },

            include: [
                {model: model.submenu, order: ["submenu_id", 'ASC']}
            ]
        })
        if (menu) {
            res.status(200).json({
                message: 'Data ditemukan',
                menu: menu
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