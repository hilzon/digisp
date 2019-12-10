const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const chatdetailSchema = Schema ({
    id_chating: Schema.Types.ObjectId,
    sender: String,
    message: String
}, {timestamps: true});

module.exports = mongoose.model('chatdetails', chatdetailSchema);