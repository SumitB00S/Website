const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"hayabusa.proxy.rlwy.net",
    user:"root",
    password:"FSOJqxTWwJmwXejCcaDYdCehFgjOoKwR",
    database:"railway",
    port:21423
});
db.connect((err)=>{
    if(err){
        console.log("Connection failed:",err);
    }
    else{
        console.log("Connected to Railway MySQL!");
    }
});

module.exports=db;
