const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    numberViewer:{
        type:Number,
        default: 0
    },
    likes:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image:{
        type: String,
        default: 'https://img.freepik.com/premium-photo/working-desk-background_115919-23105.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1697673600&semt=ais'
    },
    author:{
        type: String,
        default: 'Admin'
    }
},{
    timestamps: true,
    toJSON: { virtuals:true },
    toObject: { virtuals:true }
});


//Export the model
module.exports = mongoose.model('Blog', blogSchema);