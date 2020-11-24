const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: "L'email est requis",
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Entrez un email valide"
        },
    },
    password: {
        type: String,
        required: "Le mot de passe est requis"
    }
});

module.exports = mongoose.model('User', userSchema);