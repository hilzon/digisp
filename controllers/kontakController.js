const Kontak = require('../models/kontak');

// KONTAK
exports.listKontak = async (req, res) => {
    const data = await Kontak.find()
    res.send(JSON.stringify({"status": 200, "response": data}));
}
  
exports.tambahKontak = async (req, res) => {
    const kontak = new Kontak(req.body);
    const status = await kontak.save();
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  } 
  
  exports.ubahKontak = async(req,res) => {
    const { id } = req.params;
    const status = await Kontak.update({_id: id}, req.body);
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
  
  exports.hapusKontak = async(req,res) => {
    let { id } = req.params;
    const status = await Kontak.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }