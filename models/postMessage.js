const mongoose=require('mongoose');

const postSchem=mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
});


const PostMessage =mongoose.model('Post', postSchem);

module.exports = PostMessage;