const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promoSchema = Schema({
    nama_promo: String,
    image_promo: String,
    deskripsi_promo: String,
    status_promo: {
        type: Boolean,
        default: true
    }
}, {timestamps: true}); 

module.exports = mongoose.model('promos', promoSchema);


