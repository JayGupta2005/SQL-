const { faker } = require('@faker-js/faker');
const mysql = require(`mysql2`);
const express = require('express');
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Gupt@666'
});

let getRandomUser = ()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};


app.get("/",(req,res)=>{
    let q =`SELECT COUNT(*) FROM user`;
    // res.send("Welcome to home");
    try{
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    }
    catch(err){
        console.log(err);
        res.send("some err in DB");
    }
});

app.listen("8080",()=>{
    console.log("Server is running on port 8080");
});

// try{
//     connection.query(q, [data], (err,result)=>{
//         if(err){
//                 console.log(err);
//             }
//             console.log(result);
//         });
//     }
// catch(err){
//     console.log(err);
// }
        
// connection.end();