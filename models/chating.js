const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const chatingSchema = Schema ({
    id_user: Schema.Types.ObjectId,
    id_admin: Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('chatings', chatingSchema);