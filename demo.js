const express = require('express')

app = express()

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))

 require('dotenv').config()
let data =[]
 
app.get('/',(req,res)=>{
    console.log(req.url);

    res.render('home', {data:data})   
})
app.get('/form',(req,res)=>{
    console.log(req.url); 

    res.render('form')
})
app.post('/form',(req,res)=>{

    console.log(req.url);

    let {name,email,supportId,feedback}=req.body;

    let newdata ={id:Date.now(),name:name,email:email,supportId:supportId,feedback:feedback}
    data.push(newdata)  
    console.log(data);
    res.redirect('/');
        
})

app.get('/editdata/:id', (req,res)=>{
    let id = req.params.id;
    let user = data.find((it)=> it.id == id);

    console.log(id);
    res.render('editdata',{user})
})

app.post('/editdata/:id',(req,res)=>{
    let {name,email,supportId,feedback} =req.body

    let user =data.find((it)=>it.id ==req.params.id)

    user.name =name
    user.email =email
    user.supportId=supportId
    user.feedback =feedback

    res.redirect('/') 
})

app.get('/deletedata/:id',(req,res)=>{
    let id =req.params.id;
    console.log(id);
    let deletedata =data.filter((it)=>it.id != id)
    data=deletedata
    res.redirect('/')
})

app.listen(process.env.port,()=>console.log('server is run')) 

