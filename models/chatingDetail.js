const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const chatingDetailSchema = Schema ({
    id_chating: Object,
    sender: String,
    message: String
}, {timestamps: true});

module.exports = mongoose.model('chatingdetails', chatingDetailSchema);