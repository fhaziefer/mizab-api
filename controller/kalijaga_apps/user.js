const model = require('../../model/index');
const controller = {};
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');

// SEARCH USER
controller.getSearch = async function (req, res) {
    const search = req.query.keyword;

    try {
        let user = await model.user.findAll({
            attributes: ['user_id', 'username'],
            include: [
                {model: model.user_data, as: 'profil', attributes: ['nama', 'avatar']},
                {model: model.role, as: 'role' , attributes: {
                    exclude: ['group_id']}}
            ],
            where: {
                [Op.or]: [{
                    username: {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    
                    '$profil.nama$': {
                        [Op.like]: '%' +search+ '%'
                    }
                },{
                    '$role.role$': {
                        [Op.like]: '%' +search+ '%'
                    }
                }
            ]},
            order: [
                ["user_id", "ASC"]
            ]   
        })
        if (user.length > 0) {
            res.status(200).json({
                message: 'Search data USER',
                data: user
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

// GET BY ID
controller.getOneById = async function(req,res) {
    try {
        let user = await model.user.findAll({
            where: {
                user_id: req.params.user_id
            },
            include: [
                {model: model.user_data, as: 'profil', 
                include: [
                    {model: model.alamat}, 
                    {model: model.contacts}
                ]},
                {model: model.role, as: 'role'},
            ]
        })
        if (user.length > 0) {
            res.status(200).json({
                message: 'Data ditemukan',
                data: user
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

// GET BY USERNAME
controller.getOneByUsername = async function(req,res) {
    try {
        let user = await model.user.findAll({
            where: {
                username: req.params.username
            },
            include: [
                {model: model.user_data, as: 'profil', 
                    include: 
                    [
                        {model: model.alamat},
                        {model: model.contacts}
                    ]
                },
                {model: model.role, as: 'role'},
            ]
        })
        if (user.length > 0) {
            res.status(200).json({
                message: 'Data ditemukan',
                data: user
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

// PATCH UPDATE USERNAME
controller.updateUsername = async function(req, res){

    const oldUsername = req.body.oldUsername
    const newUsername = req.body.newUsername

    const checkOldUsername = await model.user.findOne({
        where: {
            user_id: req.params.user_id
        }
    })

    console.log(checkOldUsername.username)
    console.log(oldUsername)
    
    if (checkOldUsername.username !== oldUsername){
        return res.status(401).json({
            message: 'Username Salah!'
        })
    }

    const checkNewUsername = await model.user.findOne({
        where: {
            username: newUsername
        }
    })

    if (checkNewUsername){
        return res.status(400).json({
            message: 'Username sudah digunakan! Gunakan username lain'
        })

    } try {
        let user = await model.user.update({
            username: newUsername
        },{
            where: {
                user_id: req.params.user_id
            }
        })
        res.status(200).json({
            message: 
            `Berhasil mengubah ${oldUsername} menjadi ${newUsername}`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}

// PATCH UPDATE PASSWORD
controller.updatePassword = async function(req,res) {

    const checkUser = await model.user.findOne({
        where: {
            user_id: req.params.user_id
        }
    })
    
    if (!checkUser){
        return res.status(404).json({
            message: `User ${req.params.user_id} tidak ditemukan`
        })
    }
    
    const isValid = await bcrypt.compare(req.body.oldPassword, checkUser.password);
    if (!isValid){
        return res.status(401).json({
            message: 'Password Salah!'
        });
    }

    try {
        const newHashPassword = await bcrypt.hash(req.body.newPassword, 10)

        let user = await model.user.update({
            password: newHashPassword
        },{
            where: {
                user_id: checkUser.user_id
            }
        })
        res.status(200).json({
            message: `Berhasil Update Password ${checkUser.username}!`
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// PATCH UPDATE DATA USER
controller.updateData = async function(req, res) {

    const checkUser = await model.user.findOne({
        where: {
            user_id: req.params.user_id
        }
    })
    
    if (!checkUser){
        return res.status(404).json({
            message: `User ${req.params.user_id} tidak ditemukan`
        })
    } try {

        let user_profile = await model.user_data.update({
            nama: req.body.nama,
            wali: req.body.wali,
            kamar: req.body.kamar,
            bio: req.body.bio,
            khidmah: req.body.khidmah,
            tgl_lahir: req.body.tgl_lahir,
        },{
            where: {
                user_data_id: checkUser.user_data_id
            }
        })
        
        let user_alamat = await model.alamat.update({
            alamat: req.body.alamat,
            desa: req.body.desa,
            kecamatan: req.body.kecamatan,
            kota: req.body.kota,
            provinsi: req.body.provinsi,
            kode_pos: req.body.kode_pos
        },{
            where: {
                alamat_id: checkUser.user_data_id
            }
        })
        
        // VALIDASI EDIT NOMOR HP DAN INSTAGRAM

        const editPhone = req.body.phone
        const editInstagram = req.body.instagram

        if (editPhone){

            let user_contact = await model.contacts.update({
                phone: "62" + editPhone
            },{
                where: {
                    contact_id: checkUser.user_data_id
                }
            })
        }


        if (editInstagram){

            let user_contact = await model.contacts.update({
                instagram: "https://www.instagram.com/" + editInstagram
            },{
                where: {
                    contact_id: checkUser.user_data_id
                }
            })
        }

        let user_contact = await model.contacts.update({
            email: req.body.email
        },{
            where: {
                contact_id: checkUser.user_data_id
            }
        })

        res.status(200).json({
            message: `Berhasil Update Data ${checkUser.username}!`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// DROP USER
controller.dropUser = async function(req,res) {

    const dropId = "404"

    const checkUser = await model.user.findOne({
        where: {
            user_id: req.params.user_id
        }
    })
    
    if (!checkUser){
        return res.status(404).json({
            message: `User ${req.params.user_id} tidak ditemukan`
        })
    }
    
    try {
        let user = await model.user.update({
            group_id: dropId
        },{
            where: {
                user_id: checkUser.user_id
            }
        })
        res.status(200).json({
            message: `Berhasil Menghapus Akun ${checkUser.username}!`
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;