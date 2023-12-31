const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var informationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

//Export the model
module.exports = mongoose.model('Information', informationSchema);