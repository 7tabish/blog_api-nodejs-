const express=require('express');
const app= express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const Author=require('../models/author');
const PORT=8080;
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://tabish:<password>@shop-api-lycpn.mongodb.net/test?retryWrites=true&w=majority')
.then(res=>console.log("coneected successfully !"))
.catch(err=>console.log(err.message));
mongoose.set('useFindAndModify', false);

app.get('/',(req,res)=>{
Author.find()
.exec()
.then(result=>res.status(200).json({Authors:result}))
.catch(err=>res.status(202).json({Error:err.message}));

})
app.post('/',(req,res)=>{
    //extract all fields for futher validatoin and filteration
    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.email;
    const adress=req.body.adress;
    const author= new Author({
        _id:new mongoose.Types.ObjectId(),
        name,phone,email,adress
    });
    author.save().
    then(result=>{
        // if(result){
        //     res.status(200).json({Message:"Data have been saved !"});
        // }
        res.status(200).json({
            createdAuthor:result
        })
       
    })
    .catch(err=>res.status(201).json({Error:err.message}));
    
    
});

app.delete('/:authorId',(req,res)=>{
    // findbyIdandRemove will return null in case of node id exists
    // Author.findByIdAndRemove(req.params.authorId,(err,author)=>{
    //     if(err) res.status(400).json({Error:err.message});
    //     if(author){
    //         console.log("author is ",author);
    //         res.status(200).json({Delete_id:author.name,message:"Deleted Successflly !"});
    //     }
    //     else{
    //         res.status(500).json({message:'No record found with this id !'});
    //     }
    Author.findByIdAndRemove(req.params.authorId)
    .exec()
    .then(result=>{
        if(result){
            res.status(200).json({deletedAuthor:result.name,status:"success"});
        }
        else{
            res.status(404).json({status:"failed",message:"No record found with the provided id !"});
        }
    })
    .catch(err=>res.status(500).json({Error:err.message}));
        
})

app.patch('/:authorId',(req,res)=>{
    // Author.findByIdAndUpdate(req.params.authorId,req.body,{new:true},(err,updatedAuthor)=>{
    //     if(err) res.status(500).send(err.message);
    //     if(updatedAuthor){
    //         res.status(200).json({length_is:updatedAuthor.length,updated_doc:updatedAuthor});
    //     }
    //     else{
    //          res.status(500).send(err.message);
    //     }
        
    // })
    Author.findByIdAndUpdate(req.params.authorId,req.body,{new:true})
    .exec()
    .then(updatedAuthor=>{
            if(updatedAuthor){
                res.status(200).json({updatedAuthor:updatedAuthor,status:"Success"})
            }
            else{
                res.status(404).json({status:"failed",message:"No record found with the provided id !"});
            }
    })
    .catch(err=>{
            res.status(500).json({Error:err.message});
    })

})
module.exports=app;