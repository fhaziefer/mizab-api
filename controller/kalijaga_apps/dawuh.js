const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');

// INPUT DAWUH BARU
controller.inputDawuh = async function(req, res) {
    const dawuh = req.body.dawuh
    const dawuh_dari = req.body.dawuh_dari
    try {
        let dawuh_baru = await model.dawuh.create({
            dawuh: dawuh,
            dawuh_dari: dawuh_dari
        })

        res.status(200).json({
            message: `Berhasil menambahkan dawuh baru`,
            data: dawuh_baru
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// EDIT DAWUH
controller.updateDawuh = async function(req, res) {
    try {
        let dawuh_baru = await model.dawuh.update({
            dawuh: req.body.dawuh,
            dawuh_dari: req.body.dawuh_dari,
        },{
            where: {dawuh_id : req.params.dawuh_id}
        })
        res.status(200).json({
            message: `Berhasil update dawuh`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// SEARCH DAWUH
controller.searchDawuh = async function (req, res) {
    const search = req.query.keyword;
    try {
        let dawuh = await model.dawuh.findAll({
            where: {
                [Op.or]: [{
                    dawuh_dari: {
                        [Op.like]: '%' +search+ '%'
                    },
                }
            ]
            },
            order: [
                ["dawuh_id", "ASC"]
            ]
        })
        let count = dawuh.length;
        if (dawuh.length > 0) {
            res.status(200).json({
                message: 'Search dawuh',
                data_size: count,
                dawuh: dawuh
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

// GET ONE DAWUH
controller.satuDawuh = async function(req, res){
    const dawuh = await model.dawuh.findOne({
        where: {
            dawuh_id: req.params.dawuh_id
        }
    })
    if (!dawuh){
        res.status(404).json({
            message: 'Dawuh tidak ditemukan',
        })
    } else {
        res.status(200).json({
            message: 'Dawuh ditemukan',
            data: dawuh
        })
    }
}

// DELETE DAWUH
controller.deleteDawuh = async function(req, res){
    const dawuh_id = req.params.dawuh_id
    try {
        const dawuh = await model.dawuh.findOne({
            where: {
                dawuh_id: dawuh_id
            }
        });
        if (!dawuh){
            res.status(404).json({
                message: `Dawuh dengan id: ${dawuh_id} tidak ditemukan`
            })
        } else {
            let dawuh = await model.dawuh.destroy({
                where: {
                    dawuh_id: dawuh_id
                }
            })
            if (!dawuh){
                res.status(404).json({
                    message: 'Tidak bisa menghapus Dawuh ini',
                })
            } else {
                res.status(200).json({
                    message: `Dawuh dengan id ${dawuh_id} berhasil dihapus`
                })
            }
        }
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}
module.exports = controller;