const Fasilitas = require('../models/fasilitas')
const fs = require('fs')
const path = require('path')


// FASILITAS
  exports.listFasilitas = async (req, res) => {
    const data = await Fasilitas.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
  exports.tambahFasilitas = async (req, res) => {
    if (req.files) {
        let pic = req.files.isi_fasilitas
        let path = `./public/image/fasilitas/${pic.name}`
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const fasilitasData = {
              judul_fasilitas: req.body.judul_fasilitas,
              nama_fasilitas: req.body.nama_fasilitas,
              isi_fasilitas: pic.name ,
              status_fasilitas: req.body.status_fasilitas
            }
            const fasilitas = new Fasilitas(fasilitasData);
            const status = await fasilitas.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
  exports.ubahFasilitas = async (req, res) => {
    const { id } = req.params
    if(req.files){
      let pic = req.files.isi_fasilitas
      let path = `./public/image/fasilitas/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.isi_fasilitas = pic.name
          const status = await Fasilitas.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Fasilitas.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  exports.hapusFasilitas = async (req,res) => {
    let { id } = req.params;
    const status = await Fasilitas.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }