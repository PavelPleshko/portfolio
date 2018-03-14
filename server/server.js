var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var credentials = require('./environment/environment').mailCredentials;
var cors = require('cors')
var assisters = require('./helpers/lib');
var app=express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
app.use(cors());

var smtpTransport = nodemailer.createTransport({
    service: "yandex",
    host: "smtp.yandex.ru",
    port:465,
    auth: {
        user: credentials.email,
        pass: credentials.pass
    }
});


app.post('/send',function(req,res){
	console.log(req.body);
var mailOpts = {
	to:credentials.to,
	subject:req.body.name + " left a message from portfolio website",
	from:credentials.email,
	text:assisters.createMsg(req.body),
	html:assisters.createHtml(req.body)
}
smtpTransport.sendMail(mailOpts,function(response,error){
	if(error){
		console.log(error);
		res.json(error);
	}else{
		console.log(response);
		res.json(response);
	}
})
})




app.listen(3000,function(){
console.log("Express Started on Port 3000");
});


