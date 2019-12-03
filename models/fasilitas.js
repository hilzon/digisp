const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const fasilitasSchema =  Schema ({
    judul_fasilitas: String,
    nama_fasilitas: String,
    isi_fasilitas: String,
    status_fasilitas: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('fasilitas', fasilitasSchema);