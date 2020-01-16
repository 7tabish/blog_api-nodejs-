const mongoose=require('mongoose');

const blogSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String,required:true},
    detail:{type:String,required:true},
    created_at:{type:Date,default:Date.now()},
    author_id:{type:mongoose.SchemaType.type.ObjectId,ref:'Author'}
});
module.exports=mongoose.model('Blog',blogSchema);