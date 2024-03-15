const model = require('../../model/index');
const controller = {};
const bcrypt = require('bcrypt');

// DAFTAR AWAL UNTUK MAHASANTRI SESUAI STAMBUK
controller.masSignup = async function(req, res) {

    const validId = 'MAS'+req.params.stambuk
    const validUsername = req.body.username
    
    
    const checkStambuk = await model.user.findOne({
        where: {
            user_data_id: validId
        }
    })
    
    
    if (!checkStambuk){
        return res.status(400).json({
            message:`Nomor Stambuk ${req.params.stambuk} salah!`
        })
    }
    
    const checkUsername1 = await model.user.findOne({
        where: {
            username: validUsername
        }
    });

    if (checkUsername1){
        return res.status(400).json({
            message: 'Username sudah digunakan! Gunakan username lain'
        })
    }

    try {
        
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let user = await model.user.update({
            username: validUsername.toLowerCase(),
            password: hashPassword,
        },{
            where: {
                user_data_id: validId
            }
        });
        
        let user_profile = await model.user_data.update({
            nama: req.body.nama,
            wali: req.body.wali,
            kamar: req.body.kamar,
            bio: req.body.bio,
            khidmah: req.body.khidmah,
            tgl_lahir: req.body.tgl_lahir,
        },{
            where: {
                user_data_id: validId
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
                alamat_id: validId
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
                    contact_id: validId
                }
            })
        }

        if (editInstagram){

            let user_contact = await model.contacts.update({
                instagram: "https://www.instagram.com/" + editInstagram
            },{
                where: {
                    contact_id: validId
                }
            })
        }

        let user_contact = await model.contacts.update({
            email: req.body.email
        },{
            where: {
                contact_id: validId
            }
        })

        res.status(200).json({
            message: `Berhasil Membuat Akun dengan username ${validUsername}`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// DAFTAR AWAL UNTUK MAHASANTRI SESUAI STAMBUK
controller.userSignup = async function(req, res) {

    const validId = req.params.userId
    const validUsername = req.body.username
    
    
    const checkStambuk = await model.user.findOne({
        where: {
            user_data_id: validId
        }
    })
    
    
    if (!checkStambuk){
        return res.status(400).json({
            message:`Nomor Stambuk ${req.params.stambuk} salah!`
        })
    }
    
    const checkUsername1 = await model.user.findOne({
        where: {
            username: validUsername
        }
    });

    if (checkUsername1){
        return res.status(400).json({
            message: 'Username sudah digunakan! Gunakan username lain'
        })
    }

    try {
        
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        let user = await model.user.update({
            username: validUsername.toLowerCase(),
            password: hashPassword,
        },{
            where: {
                user_data_id: validId
            }
        });
        
        let user_profile = await model.user_data.update({
            nama: req.body.nama,
            wali: req.body.wali,
            kamar: req.body.kamar,
            bio: req.body.bio,
            khidmah: req.body.khidmah,
            tgl_lahir: req.body.tgl_lahir,
        },{
            where: {
                user_data_id: validId
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
                alamat_id: validId
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
                    contact_id: validId
                }
            })
        }

        if (editInstagram){

            let user_contact = await model.contacts.update({
                instagram: "https://www.instagram.com/" + editInstagram
            },{
                where: {
                    contact_id: validId
                }
            })
        }

        let user_contact = await model.contacts.update({
            email: req.body.email
        },{
            where: {
                contact_id: validId
            }
        })

        res.status(200).json({
            message: `Berhasil Membuat Akun dengan username ${validUsername}`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// SIGNUP NEW USER + DATA
controller.signup = async function(req, res) {
    
    const validUsername = req.body.username

    const count = await model.user.count();

    const customId = 'KLJGID' + `${count + 1}`+ '-' + `${model.normalDate.idDate}`
    
    const r = req.body.group_id
    const userRole = r || 5

    const checkUsername2 = await model.user.findOne({
        where: {
            username: validUsername
        }
    })

    if (checkUsername2){
        return res.status(400).json({
            message: 'Username sudah digunakan! Gunakan username lain'
        })

    } try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        let user = await model.user.create({
            user_id: customId,
            user_data_id: customId,
            group_id: userRole,
            username: validUsername.toLowerCase(),
            password: hashPassword
        })
        let user_profile = await model.user_data.create({
            user_data_id: customId,
            alamat_id: customId,
            contact_id: customId,
            nama: req.body.nama,
            wali: req.body.wali,
            kamar: req.body.kamar,
            bio: req.body.bio,
            tgl_lahir: req.body.tgl_lahir,
            status: "user external"
        })
        
        let user_alamat = await model.alamat.create({
            alamat_id: customId,
            alamat: req.body.alamat,
            desa: req.body.desa,
            kecamatan: req.body.kecamatan,
            kota: req.body.kota,
            provinsi: req.body.provinsi,
            kode_pos: req.body.kode_pos
        })
        
        // VALIDASI EDIT NOMOR HP DAN INSTAGRAM

        var checkPhone = req.body.phone
        var checkInstagram = req.body.instagram
        
        if (checkPhone){
            var checkPhone = "62" + checkPhone
        }

        if (checkInstagram){
            var checkInstagram = "https://www.instagram.com/" + checkInstagram
        }

        const validPhone = checkPhone
        const validInstagram = checkInstagram

        let user_contact = await model.contacts.create({
            contact_id: customId,
            email: req.body.email,
            phone: validPhone,
            instagram: validInstagram,
        })

        res.status(200).json({
            message: `Berhasil Membuat Akun dengan username ${validUsername}`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// LOGIN USERNAME AND PASSWORD
controller.login = async function(req,res) {

    const checkUser = await model.user.findOne({
        where: {username: req.body.username.toLowerCase()}
    });
    if (!checkUser){
        return res.status(401).json({
            message: 'Username Salah!'
        });
    }

    const isValid = await bcrypt.compare(req.body.password, checkUser.password);
    if (!isValid){
        return res.status(401).json({
            message: 'Password Salah!'
        });
    }
    res.status(200).json({
        message: 'Login Berhasil',
        data: `Selamat datang ${checkUser.username}`
    });
}

module.exports = controller;