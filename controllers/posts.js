
var mongoose=require('mongoose');
const PostMessage = require('../models/postMessage')

const getPosts= async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        // console.log(postMessages)
        res.status(200).json(postMessages)
    }
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPost=async (req, res) => {
        const post = req.body;
        // console.log("This is the post....");
        //console.log("This i sthe selected file in post console",post.selectedFile)
        const newPost =new PostMessage(post);
        try {
            await newPost.save();
            // console.log("This is the new Post..", newPost)
            res.status(201).json(newPost)
        } 
        catch (error) {
            res.status(409).json({message: error.message})
        }

}

const updatePost =async (req, res) => {
    const {id:_id}=req.params;
    const post = req.body;
    console.log("Sab thik;")

    const makingValid=_id.slice(1,);
    // const makingValid='ObjectId("617b1a13ddc89d7470e7d94f")';

    // console.log(makingValid)
    var objectId = mongoose.Types.ObjectId.isValid(makingValid)
  
    console.log(objectId);
    if(!objectId) {
        console.log("Sab thik id not match...")
        return res.status(404).send("No Post with this Id");
    }
    const updatedPost= await PostMessage.findByIdAndUpdate(makingValid, { ...post, makingValid}, { new:true });
    console.log("Id matched and data saved to database....")
    res.json(updatedPost);
}

const deletePost = async (req, res)=>{
    const {id:_id}=req.params;
    const post = req.body;
    console.log("Sab thik in delete");

    const makingValid=_id.slice(1,);
    // const makingValid='ObjectId("617b1a13ddc89d7470e7d94f")';

    // console.log(makingValid)
    const objectId = mongoose.Types.ObjectId.isValid(makingValid)
  
    console.log(objectId);
    if(!objectId) {
        console.log("ohh id not match...")
        return res.status(404).send("No Post with this Id for delete..");
    }
    await PostMessage.findByIdAndRemove(makingValid);
    // console.log("Id matched and data saved to database....")...
    res.json({message:"Post deleted Successfully..."});
}


const likePost= async (req, res) => {
        const {id}=req.params;
        console.log("Sab thik like count..;", id);

        const makingValid=id.slice(1,);
        const makingValidId=`ObjectId("${makingValid}")`;


        console.log("making valid id",makingValidId);
        const objectId = mongoose.Types.ObjectId.isValid(makingValid);
      
         console.log(objectId);
        if(!objectId) {
            console.log("Sab thik like Count id not match...")
            return res.status(404).send("No Post with this Id");
        }
        const post= await PostMessage.findById(makingValid);
        console.log("doondh liye..");
        const updatedPost=await PostMessage.findByIdAndUpdate(makingValid, {likeCount:post.likeCount + 1}, { new:true});
        console.log("ho gya...");
        res.json(updatedPost);
        
};



module.exports ={getPosts, createPost, updatePost, deletePost, likePost}