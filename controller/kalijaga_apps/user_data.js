const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');

// FUNCTION SEARCH DATA user_data MUSTAHIQ PURNA
controller.getSearchPurna = async function (req, res) {
    const search = req.query.keyword;
    try {
        let user_data = await model.user_data.findAll({

            // ATTRIBUTES UNTUK FILTER DATA APA SAJA YANG INGIN DITAMPILKAN 
            attributes: ['user_data_id', 'nama', 'avatar'],
            
            // FUNCTION INCLUDE UNTUK MEMASUKKAN MODEL YANG JOIN TABEL BERELASI
            include: [{
                model: model.alamat,
                attributes: {
                    exclude: ['alamat_id','alamat', 'desa','kecamatan', 'created_at', 'updated_at']}
            },{
                
                // ATRIBUT EXCLUDE UNTUK FILTER DATA APA SAJA YANG TIDAK DITAMPILKAN
                model: model.contacts,
                attributes: {
                    exclude: ['contact_id', 'email', 'created_at', 'updated_at']}
            }],

            where: {

                // FILTER STATUS
                status: 'purna',

                // FUNCTION OP.OR UNTUK FITUR SEARCH QUERY DI DALAM BODY YANG DIGET SESUAI KEYWORD
                [Op.or]: [{
                    nama: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    //'$NamaAliasModel.Parameter$' UNTUK MENGAMBIL PARAMETER DI DALAM NEST JSON
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
                ["user_data_id", "ASC"]
            ]   
        })
        if (user_data.length > 0) {
            res.status(200).json({
                message: 'Search data MUSTAHIQ PURNA',
                data: user_data
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

// FUNCTION SEARCH DATA user_data MUSTAHIQ NON PURNA
controller.getSearchNonPurna = async function (req, res) {
    const search = req.query.keyword;
    try {
        let user_data = await model.user_data.findAll({

            // ATTRIBUTES UNTUK FILTER DATA APA SAJA YANG INGIN DITAMPILKAN 
            attributes: ['user_data_id','nama', 'avatar'],
            
            // FUNCTION INCLUDE UNTUK MEMASUKKAN MODEL YANG JOIN TABEL BERELASI
            include: [{
                model: model.alamat,
                attributes: {
                    exclude: ['alamat_id','alamat', 'desa','kecamatan', 'created_at', 'updated_at']}
            },{
                
                // ATRIBUT EXCLUDE UNTUK FILTER DATA APA SAJA YANG TIDAK DITAMPILKAN
                model: model.contacts, attributes: {
                exclude: ['contact_id', 'email', 'created_at', 'updated_at']}
                    }],

            where: {

                // FILTER STATUS
                status: 'nonpurna',

                // FUNCTION OP.OR UNTUK FITUR SEARCH QUERY DI DALAM BODY YANG DIGET SESUAI KEYWORD
                [Op.or]: [{
                    nama: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    //'$NamaAliasModel.Parameter$' UNTUK MENGAMBIL PARAMETER DI DALAM NEST JSON
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
                ["user_data_id", "ASC"]
            ]   
        })
        if (user_data.length > 0) {
            res.status(200).json({
                message: 'Search data MUSTAHIQ NON PURNA',
                data: user_data
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

// SEARCH DATA user_data MAHASANTRI
controller.getSearchSiswa = async function (req, res) {
    const search = req.query.keyword;
    try {
        let user_data = await model.user_data.findAll({

            // ATTRIBUTES UNTUK FILTER DATA APA SAJA YANG INGIN DITAMPILKAN 
            attributes: ['user_data_id','nama', 'bagian', 'avatar'],
            
            // FUNCTION INCLUDE UNTUK MEMASUKKAN MODEL YANG JOIN TABEL BERELASI
            include: [{
                model: model.alamat,
                attributes: {
                    exclude: ['alamat_id','alamat', 'desa','kecamatan', 'created_at', 'updated_at']}
            },{
                
                // ATRIBUT EXCLUDE UNTUK FILTER DATA APA SAJA YANG TIDAK DITAMPILKAN
                model: model.contacts, attributes: {
                exclude: ['contact_id', 'email', 'created_at', 'updated_at']}
                    }],

            where: {

                status: 'mahasantri',

                // FUNCTION OP.OR UNTUK FITUR SEARCH QUERY DI DALAM BODY YANG DIGET SESUAI KEYWORD
                [Op.or]: [{
                    nama: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    bagian: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    //'$NamaAliasModel.Parameter$' UNTUK MENGAMBIL PARAMETER DI DALAM NEST JSON
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
                ["bagian", "ASC"],
                ["nama", "ASC"]
            ]   
        })
        if (user_data.length > 0) {
            res.status(200).json({
                
                message: 'Search data MAHASANTRI',
                data: user_data
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

// GET SEMUA DATA user_data
controller.getAll = async function(req, res) {
    try {
        let user_data= await model.user_data.findAll({
            attributes: {exclude: ['contact_id', 'alamat_id', 'nilai_id']},
            include: [
                {model: model.alamat},
                {model: model.contacts},
                {model: model.nilai}
            ],
            order: [
              ["bagian", "ASC"],
              ["nama", "ASC"]
            ]
        })
            if (user_data.length > 0) {
                res.status(200).json({
                    message: 'Get All User Data',
                    data: user_data
                })
            }else{
                res.status(200).json({
                    message: 'Data tidak ditemukan',
                    data:[],
                })
            }
    }catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// GET SATU DATA user_data
controller.getOne = async function(req, res) {
    try {
        let user_data = await model.user_data.findAll({
            where: {
                user_data_id: req.params.user_data_id
            },
            include: [
                {model: model.alamat},
                {model: model.contacts},
                {model: model.nilai},
            ]
        })
        if (user_data.length > 0) {
            res.status(200).json({
                message: 'Data ditemukan',
                data: user_data
            })
        }else{
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

// MUTASI MAHASANTRI
controller.mutasi = async function(req, res) {
    const mutasiMahasantri = "boyong"
    try {
        let checkStb = await model.user_data.findOne({
            where: {
                user_data_id: req.params.user_data_id
            }
        });

        if (!checkStb){
            res.status(404).json({
                message: `Mahasantri dengan id ${req.params.user_data_id} tidak ditemukan` 
            })
        }

        let user_status = await model.user_data.update({
            status: mutasiMahasantri
        },{
            where: {
                user_data_id: checkStb.user_data_id
            }
        });

        let user_data = await model.user_data.findOne({
            where: {
                user_data_id: req.params.user_data_id
            }
        })

        res.status(200).json({
            message: "Berhasil Mutasi Mahasantri",
            data: user_data
        })
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// MUTASI MAHASANTRI
controller.undoMutasi = async function(req, res) {
    const undoMutasiMahasantri = "mahasantri"
    try {
        let checkStb = await model.user_data.findOne({
            where: {
                user_data_id: req.params.user_data_id
            }
        });

        if (!checkStb){
            res.status(404).json({
                message: `Mahasantri dengan id ${req.params.user_data_id} tidak ditemukan` 
            })
        }

        let user_status = await model.user_data.update({
            status: undoMutasiMahasantri
        },{
            where: {
                user_data_id: checkStb.user_data_id
            }
        });

        let user_data = await model.user_data.findOne({
            where: {
                user_data_id: req.params.user_data_id
            }
        })

        res.status(200).json({
            message: "Berhasil Mutasi Mahasantri",
            data: user_data
        })
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// EXPORT CONTROLLER
module.exports = controller;