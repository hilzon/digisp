const Addon = require('../models/addon')
const fs = require('fs')
const path = require('path')


// ADDON
  exports.listAddon = async (req, res) => {
    const data = await Addon.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
  exports.tambahAddon = async (req, res) => {
    if (req.files) {
        let pic = req.files.image_addon
        let path = `./public/image/addon/${pic.name}`
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const addonData = {
              nama_addon: req.body.nama_addon,
              image_addon: pic.name,
              deskripsi_addon: req.body.deskripsi_addon,
              harga_addon: req.body.harga_addon,
              status_addon: req.body.status_addon,
              id_kategori: req.body.id_kategori,

            }
            const addon = new Addon(addonData);
            const status = await addon.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
  exports.ubahAddon = async (req, res) => {
    const { id } = req.params
    if(req.files){
      let pic = req.files.image_addon
      let path = `./public/image/addon/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_addon = pic.name
          const status = await Addon.update({_image_name: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Addon.update({_image_name: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  
  exports.hapusAddon = async (req,res) => {
    const { id } = req.params;
    if(req.files){
      let pic = req.files.image_addon
      let path = `./public/image/addon/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_addon = pic.name
          const status = await Addon.remove({_image_name: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Addon.remove({_image_name: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }

    const status = await Addon.remove({_image_name: id});
        res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }