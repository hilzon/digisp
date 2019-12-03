const Promo = require('../models/promo');


// PROMO
exports.listPromo = async (req, res) => {
    const data = await Promo.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
  exports.tambahPromo = async (req, res) => {
    if (req.files) {
        let pic = req.files.image_promo
        let path = `./public/image/promo/${pic.name}`
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const promoData = {
              nama_promo: req.body.nama_promo,
              image_promo: pic.name,
              deskripsi_promo: req.body.deskripsi_promo,
              status_promo: req.body.status_promo
            }
            const promo = new Promo(promoData);
            const status = await promo.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
  exports.ubahPromo = async (req, res) => {
    const { id } = req.params
    if(req.files){
      let pic = req.files.image_promo
      let path = `./public/image/promo/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_promo = pic.name
          const status = await Promo.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Promo.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  exports.hapusPromo = async (req,res) => {
    let { id } = req.params;
    const status = await Promo.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }