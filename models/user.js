const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

// Create a schema
const userSchema = Schema ({
    nama_user: String,
    email_user: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true 
    },
    password_user: { 
        type: String,
        required: true
    },

    hp_user: Number,
    alamat_user: String,
    tagihan_user: Number,
    image_user: String,
    status_user: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);


// userSchema.pre('save', async function(next) {
//     try {
//         //Generate a salt
//         const salt = await bcrypt.genSalt(10);
//         // Generate a password hash (salt + hash)
//         const passwordHash = await bcrypt.hash(this.password, salt);
//         // Re-assign hashed version over original, plain text password
//         this.password = passwordHash;
//         next();

//         console.log('salt', salt);
//         console.log('normal password', this.password);
//         console.log('hashed password', passwordHash);

//     } catch(error) {
//         next(error);
//     }
// });

// userSchema.methods.isValidPassword = async function(newPassword) {
//     try {
//         return await bcrypt.compare(newPassword, this.password);
//     } catch(error) {
//         throw new Error(error);
//     }
// }


// // Create a model
// const User = mongoose.model('users', userSchema);

// // Export the model
// module.exports = User;

