const express= require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express(express.json));

app.set("view engine", "ejs");

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('SERVER corriendo http://localhost:5000');

});