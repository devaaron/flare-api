const config = require('config');

const api_key = config.get('email.apiKey');
const domain = config.get('email.domain');
var mailgun = require('mailgun-js')({
  apiKey: api_key, 
  domain: domain, 
  testMode: false
});

var send = function(toEmail, callbackFn) {
  var data = {
    from: 'outreach <flare-bear@' + domain + '>',
    to: '1aaronsnowden@gmail.com',
    subject: 'You\'ve been beckoned',
    text: 'Join your friends on flare'
  }; 
  
  console.log('sending email to ' + toEmail)
  
  return mailgun.messages().send(data, function (error, body) {
    if(error) {console.log("Problem sending email: " + error.message, "status code: " + error.statusCode)}
    else if(callbackFn) {
      callbackFn(body);
    }
  });
}

module.exports = {
  send
}