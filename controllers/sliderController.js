const Slider = require('../models/slider')
const Fs = require('fs')
const path = require('path')


// SLIDER
  exports.listSlider = async (req, res) => {
    const data = await Slider.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
  exports.tambahSlider = async (req, res) => {
    if (req.files) {
        let pic = req.files.image_slider
        let lokasi = `./public/image/slider/${pic.name}`
        pic.mv(lokasi, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const sliderData = {
              nama_slider: req.body.nama_slider,
              image_slider: pic.name,
              url_slider: req.body.url_slider,
              status_slider: req.body.status_slider
            }
            const slider = new Slider(sliderData);
            const status = await slider.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
  exports.ubahSlider = async (req, res) => {
    const { id } = req.params
    if(req.files){
      let pic = req.files.image_slider
      let path = `./public/image/slider/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_slider = pic.name
          const status = await Slider.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Slider.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  exports.hapusSlider = async (req,res) => {
    let { id } = req.params;
    const status = await Slider.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }