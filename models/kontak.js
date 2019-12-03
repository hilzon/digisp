const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const kontakSchema =  Schema ({
    nama_kontak: String,
    email_kontak: String,
    pesan_kontaks: String
}, {timestamps: true});

module.exports = mongoose.model('kontaks', kontakSchema);