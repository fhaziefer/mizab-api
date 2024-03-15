const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');

// SEARCH ZIAROH
controller.searchZiaroh = async function (req, res) {
    const search = req.query.keyword;
    try {
        let ziaroh = await model.ziaroh.findAll({
            attributes: {exclude: ['alamat_id', 'catatan_id', 'no_urut']},
            include: [{
                model: model.alamat,
                attributes: {
                    exclude: ['alamat_id','alamat', 'desa','kecamatan', 'created_at', 'updated_at']}
            }],
            where: {
                [Op.or]: [{
                    nama_makam: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    sub_nama_makam: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    '$alamat.kota$': {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                
                    '$alamat.provinsi$': {
                        [Op.like]: '%' +search+ '%'
                    }
                }
                
            ]
            },
            order: [
                ["no_urut", "ASC"]
            ]
        })
        let count = ziaroh.length;
        if (ziaroh.length > 0) {
            res.status(200).json({
                message: 'Search ziaroh',
                data_size: count,
                ziaroh: ziaroh
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

controller.getOneZiaroh = async function (req,res) {
    try {
        let ziaroh = await model.ziaroh.findOne({
            where: {
                ziaroh_id : req.params.ziaroh_id
            },
            include: [
                {model: model.alamat},
                {model: model.ziaroh_catatan},
                {model: model.ziaroh_bio, order: ["biografi_id", "ASC"]},
            ]
        })
        if (ziaroh){
            res.status(200).json({
                message: "data ditemukan",
                data: ziaroh
            })
        } else {
            res.status(400).json({
                message: 'Data tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;