const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paketSchema = mongoose.Schema({
    nama_paket: String,  
    image_paket: String,
    deskripsi_paket: String,
    status_paket: {
        type: Boolean,
        default: true
    },
    harga_paket: Number,
}, {timestamps: true});

module.exports = mongoose.model('pakets', paketSchema);

