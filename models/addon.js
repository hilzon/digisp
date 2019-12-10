const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addonSchema = Schema({
    nama_addon: String,
    image_addon: String,
    deskripsi_addon: String,
    harga_addon: Number,
    status_addon: {
        type: Boolean,
        default: true
    },
    id_kategori: Schema.Types.ObjectId
}, {timestamp:true});

module.exports = mongoose.model('addons', addonSchema);

