const ChatingDetail = require('../models/chatingDetail');

// KONTAK
exports.listChatingDetail = async (req, res) => {
    const data = await ChatingDetail.find()
    res.send(JSON.stringify({"status": 200, "response": data}));
}
  
exports.tambahChatingDtail = async (req, res) => {
    const chatingDetail = new ChatingDetail(req.body);
    const status = await chatingDetail.save();
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  } 
  
  exports.ubahChatingDetail = async(req,res) => {
    const { id } = req.params;
    const status = await ChatingDetail.update({_id: id}, req.body);
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
  
  exports.hapusChatingDetail = async(req,res) => {
    let { id } = req.params;
    const status = await ChatingDetail.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }