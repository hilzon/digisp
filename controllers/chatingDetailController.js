const Chatingdetail = require('../models/chatingdetail');

// KONTAK
exports.listChatingdetail = async (req, res) => {
    const data = await ChatingDetail.find()
    res.send(JSON.stringify({"status": 200, "response": data}));
}
  
exports.tambahChatingdetail = async (req, res) => {
    const chatingdetail = new ChatingDetail(req.body);
    const status = await chatingdetail.save();
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  } 
  
  exports.ubahChatingdetail = async(req,res) => {
    const { id } = req.params;
    const status = await Chatingdetail.update({_id: id}, req.body);
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
  
  exports.hapusChatingdetail = async(req,res) => {
    let { id } = req.params;
    const status = await Chatingdetail.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }