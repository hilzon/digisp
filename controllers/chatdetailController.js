const Chatdetail = require('../models/chatdetail');

// KONTAK

exports.listChatdetail = async (req, res) => {
    const data = await Chatdetail.find()
    res.send(JSON.stringify({"status": 200, "response": data}));
}
  
exports.tambahChatdetail = async (req, res) => {
    const chatdetail = new Chatdetail(req.body);
    const status = await chatdetail.save();
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  } 
  
  exports.ubahChatdetail = async(req,res) => {
    const { id } = req.params;
    const status = await Chatdetail.update({_id: id}, req.body);
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
  
  exports.hapusChatdetail = async(req,res) => {
    let { id } = req.params;
    const status = await Chatdetail.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
