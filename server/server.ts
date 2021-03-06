const domino = require('domino');
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const {AppServerModuleNgFactory,LAZY_MODULE_MAP } = require('./dist/server/main');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const compression = require('compression');
const csrf = require('csurf');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const helmet = require('helmet');
const assisters = require('./helpers/lib');
import { readFileSync } from 'fs'
import { join } from 'path';
const DIST_FOLDER = join(process.cwd(), 'dist');
const template = readFileSync(join(DIST_FOLDER, 'browser','index.html')).toString();
const win = domino.createWindow(template);
const PORT = process.env.PORT || 8080;
import { renderModuleFactory } from '@angular/platform-server';

global['window'] = win;
global['Node'] = win.Node;
global['navigator'] = win.navigator;
global['Event'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
global['document'] = win.document;
enableProdMode();
const app=express();

app.engine('html', (_, options, callback) => 
renderModuleFactory(AppServerModuleNgFactory,{
  document: template,
  url: options.req.url,
  extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
  ]
}).then(html=>{
  callback(null,html);
}));
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER,'browser'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/send',function(req,res){
var mailOpts = {
  to:process.env.EMAIL_TO,
  subject:req.body.name + " left a message from portfolio website",
  from:process.env.CLIENT_EMAIL,
  text:assisters.createMsg(req.body),
  html:assisters.createHtml(req.body)
}
smtpTransport.sendMail(mailOpts,function(response,error){
  if(error){
    res.json(error);
  }else{
    res.json(response);
  }
})
})
app.use(cookieParser());
app.use(csrf({ cookie: true}));
app.use((req, res, next) =>{
  let csrfToken = req.csrfToken();
  console.log(csrfToken);
  res.cookie('csrfToken', csrfToken, { sameSite: true, httpOnly: false });
  next();
});
app.use(cors());
app.use(helmet());
app.use(compression());

var smtpTransport = nodemailer.createTransport({
    service: "yandex",
    host: "smtp.yandex.ru",
    port:465,
    auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_PASSWORD
    }
});

var oneWeek = 1000 * 60 * 60 * 24 * 7;
var requestsSinceLastTime = 0;
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), { maxAge: oneWeek, lastModified: true }));

app.get('*', function (req, res) {

  res.render('index', { req: req });
  console.log(req.originalUrl, 'New get request');
  console.log(++requestsSinceLastTime, ' requests since last time');
});










app.listen(PORT,function(){
console.log("Server started on Port "+PORT);
});


