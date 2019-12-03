const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const chatingSchema = Schema ({
    id_user: Object,
    id_admin: Object
}, {timestamps: true});

module.exports = mongoose.model('chatings', chatingSchema);