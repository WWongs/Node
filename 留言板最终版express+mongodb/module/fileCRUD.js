
const mongoose = require('mongoose');

const schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

let commentSchema = new schema({
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    dateTime:{
        type:String,
        required:true
    }
})

let comments = mongoose.model('Comment',commentSchema);

module.exports = comments;