const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const sliderSchema =  Schema ({
    nama_slider: String,
    image_slider: String,
    url_slider: String,
    status_slider: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('sliders', sliderSchema);