'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const GetParams = require('./types/GetParams.js');

//data
const usersData = require("./data/users.js");
const userGroupsData = require("./data/user-groups.js");
const messagesData = require("./data/messages.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'jwks.json' // @TODO: remove domain name
    }),
    audience: 'http://localhost:3001',
    issuer: "https://kmaida.auth0.com/", // @TODO: remove domain name
    algorithms: ['RS256']
});

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

const lookupDataFromArray = function(req, subjectData) {
  let paramObj = parseParams(req)
  if(paramObj.pkId == undefined) {
    return getFromLimitedAndOffset(subjectData, paramObj);
  } else {
    let index = parseInt(paramObj.pkId) - 1;
    return subjectData[index]
  }
}

app.get('/flare/api/users/:id?' + limitOffsetParamStr, (req, res)=>{
  let subjectData = usersData.users;
  res.send(lookupDataFromArray(req, subjectData));
})


app.get('/flare/api/groups/:id?' + limitOffsetParamStr, (req,res)=>{
  let subjectData = userGroupsData.userGroups;
  res.send(lookupDataFromArray(req, subjectData));
})

app.get('/flare/api/messages/:id?' + limitOffsetParamStr, (req,res)=>{
  let subjectData = messagesData.messages;
  res.send(lookupDataFromArray(req, subjectData));
})

app.listen(3001);
console.log('Listening on localhost:3001');

