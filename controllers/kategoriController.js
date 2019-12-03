const Kategori = require ('../models/kategori')

// KATEGORI
exports.listKategori = async (req, res) => {
    const data = await Kategori.find()
    res.send(JSON.stringify({"status": 200, "response": data }));
}

exports.tambahKategori = async (req, res) => {
    if (req.files) {
        let icon = req.files.icon_kategori
        let path = `./public/image/kategori/${icon.name}`
        icon.mv(path, async (error) => {
            if (error) {
                console.log('err')
            } else {
            const kategoriData = {
                nama_kategori: req.body.nama_kategori,
                icon_kategori: icon.name
            }
            const kategori = new Kategori(kategoriData)
            const status = await kategori.save()
            res.send(JSON.stringify({"status": 200, "error": null, "respone": status }))
            }
        })
    } else {
        res.sendStatus(403)
    }
}

exports.ubahKategori = async (req, res) => {
    const { id } = req.params
    if(req.files){
        let icon = req.files.icon_kategori
        let path = `./public/image/kategori/${icon.name}`

        icon.mv(path, async(error) => {
            if(!error){
                req.files.icon_kategori = icon.name
                const status = await Kategori.update({_id: id}, req.body)
                res.send(JSON.stringify({"status": 200, "error": null, "response": status}))
            } else {
                console.log (err)
            }
        })
    } else {
        const status = await Kategori.update({_id: id}, req.body)
        res.send(JSON.stringify({"status": 200, "error": null, "response": status}))
    }
}

exports.hapusKategori = async (req, res) => {
    let { id } = req.params;
    const status = await Kategori.remove({_id: id}, req.body)
    res.send(JSON.stringify({"status":200, "error": null, "response": status}))
}