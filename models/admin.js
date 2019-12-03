const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema =  Schema ({
    nama_admin: String,
    email_admin: String,
    password_admin: String,
    foto_admin: String  
}, {timestamps: true});

module.exports = mongoose.model('admins', adminSchema);

