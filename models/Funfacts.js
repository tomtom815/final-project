const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funFactSchema = new Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funFact: {
        type: [String]
    }
    
});

module.exports = mongoose.model('Funfacts', funFactSchema);