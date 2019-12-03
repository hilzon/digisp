const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const kategoriSchema = Schema ({
    nama_kategori: String,
    icon_kategori: String
}, {timestamps: true});

module.exports = mongoose.model('kategoris', kategoriSchema);

