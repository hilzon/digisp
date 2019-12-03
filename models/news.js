const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const newsSchema =  Schema ({
    judul_news: String,
    image_news: String,
    deskripsi_news: String,
    author_news: String
}, {timestamps: true});

module.exports = mongoose.model('news', newsSchema);