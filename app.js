const express = require('express')
const app = express()

const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{ 
    res.send('<h1>Hello world</h1>')
    }) 


    const db = mysql.createConnection({
        user:"user",
        // host:"localhost", //database-kai-demo.cxkzqs74adyy.ap-southeast-1.rds.amazonaws.com
        host:"database-kai-demo.cxkzqs74adyy.ap-southeast-1.rds.amazonaws.com",
        password:"password",
        // database:"usernode"   
        database:"user"   
    });
    
    app.get('/all',(req,res)=>{
        //db.query("SELECT * FROM users",
        db.query("SELECT * FROM user",
        (err,result) =>{
            if(err){
                console.log(err);
            }else{
                res.send(result)
            }
    
        })
    })
    
    app.post('/create',(req,res)=>{
        const name = req.body.name;
        const password = req.body.password;
    
        console.log(name);
    
        //db.query("INSERT INTO users (name,password) VALUES (?,?)",[name,password],
        db.query("INSERT INTO user (name,password) VALUES (?,?)",[name,password],
        (err,result) =>{
            if(err){
                console.log(err);
            }else{
                res.send("result")
            }
    
        })
    })
    
    app.post('/login',(req,res)=>{
        const name = req.body.name;
        const password = req.body.password;
    
        db.query("SELECT * from users where name = ? AND password = ?",[name,password],
        (err,result) =>{
            if(err){
                res.send({err: err});
            }
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "wrong username or password"});
                }   
            
        })
    })    

app.listen(process.env.PORT || 5000) //change to 5000
module.exports = app