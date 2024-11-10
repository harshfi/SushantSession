const express=require('express');
const app=express();

const session = require('express-session')
const path=require('path');


app.set('view engine','hbs');
app.set('views', 'd:/java/Sushant session/views');

app.use(express.urlencoded({extended:true}));


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'bjhhjj',
  resave: false,
  saveUninitialized: true,
  
}))



app.post('/login',(req,res)=>{
   const {username}= req.body;
   req.session.cnt=0;
   req.session.username=username;
   req.session.isAdmin=false;
res.redirect('/profile');
})


app.get('/login',(req,res)=>{


    if(req.session.username) return res.redirect('/profile')
    
        res.render('login');


})


// we cannot access the profile before login
app.get('/profile',(req,res)=>{
    

   if(!req.session.username) return res.redirect('/login')
  
  if(req.session.isAdmin) res.render('admin');
    req.session.cnt++;
    res.render('profile',{
      username: req.session.username,
      count: req.session.cnt 
    })
})

app.listen(3003,()=>{
    console.log("hi your server have connected");
})