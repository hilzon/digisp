const Chating = require('../models/chating');

// KONTAK

exports.listChating = async (req, res) => {
    const data = await Fasilitas.find()
    res.send(JSON.stringify({"status": 200, "response": data}));
}

exports.tambahChating = async (req, res) => {
    const chating = new Chating(req.body);
    const status = await chating.save();
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  } 
  
  exports.ubahChating = async(req,res) => {
    const { id } = req.params;
    const status = await Chating.update({_id: id}, req.body);
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
  
  exports.hapusChating = async(req,res) => {
    let { id } = req.params;
    const status = await Chating.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }