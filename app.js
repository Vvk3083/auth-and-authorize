const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const app = express();

var jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get("/", function(req,res){
    // //this function is used to encrypt the pashword
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("polololo", salt, function(err, hash) {
    //         console.log(hash);
    //     });
    // });
    // //decrypt
    // bcrypt.compare("polololo", "$2b$10$Ww7CgbLT/CcKNVtSxEUNReT4stXs3uRCAQtaYLBoqsjVqRaIQ9bS6", function(err, result) {
    //     console.log(result);
    // });
    // res.cookie("name","harsh");
    // res.send("done");
    
    let token = jwt.sign({ email: 'harsh@example.com' }, 'secret'); //the second argument is secret and is never stored as a string
    console.log(token);
    res.cookie("token",token);
    res.send("done");
})
// app.get("/read", function(req,res){
//     console.log(req.cookies);
//     res.send("read page");
// })
app.get("/read", function(req,res){
    console.log(req.cookies.token);
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send("read page");
})

app.listen(3000);