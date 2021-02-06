const express=require('express');
const app= express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const Author=require('./api/routes/author');
const PORT=8080;
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://tabish:<password>@shop-api-lycpn.mongodb.net/test?retryWrites=true&w=majority');


//middleware for author
app.use('/author',Author);


app.listen(PORT,()=>console.log('app is running at localhost:/8080'));
