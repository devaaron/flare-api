'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const GetParams = require('./types/GetParams.js');


//email
const mail = require("./sender/mail-sender.js");

//sms
const sms = require("./sender/sms-sender.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const limitOffsetParamStr = "/:limit?/:offset?";

const parseParams = function(req) {
    return new GetParams(req.params.id, req.query.limit, req.query.offset);
}

const toNum = function(data) {
  return typeof data === "number" ? data : parseInt(data)
}

const getFromLimitedAndOffset = function(data, lo) {
  let limit = (lo.limit !== undefined ? toNum(lo.limit) : 0);
  let offset = (lo.offset !== undefined ? toNum(lo.offset) : 0);
      if(data.length != undefined) {
        return limit != 0 ? data.slice(offset, limit + offset) : data.slice(offset)
      } else {
        return data;
      }
}

app.post('/flare/api/sms', (req, res) =>{
  const recipient = req.body.to;
  const message = req.body.message;
  sms.send(recipient, message);
  res.send('sms sent')
})

//set this up as from so we can see where it goes
app.post('/flare/api/users/:id/invite', (req, res) => {
  console.log("sending email to " + user.name);
  mail.send(user.email, function() {   
    res.send('email sent successfully');
  });
})

app.listen(3001);
console.log('Listening on localhost:3001');