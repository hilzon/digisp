const Paket = require('../models/paket');


// PAKET
exports.listPaket = async (req, res) => {
    const data = await Paket.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
  exports.tambahPaket = async (req, res) => {
    if (req.files) {
        let pic = req.files.image_paket
        let path = `./public/image/paket/${pic.name}`
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const paketData = {
              nama_paket: req.body.nama_paket,
              image_paket: pic.name,
              deskripsi_paket: req.body.deskripsi_paket,
              status_paket: req.body.status_paket,
              harga_paket: req.body.harga_paket
            }
            const paket = new Paket(paketData);
            const status = await paket.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
  exports.ubahPaket = async (req, res) => {
    const { id } = req.params
    if(req.files){
      let pic = req.files.image_paket
      let path = `./public/image/paket/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_paket = pic.name
          const status = await Paket.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Paket.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  exports.hapusPaket = async (req,res) => {
    let { id } = req.params;
    const status = await Paket.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }