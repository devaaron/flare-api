const Nexmo = require('nexmo');

const config = require('config');

const api_key = config.get('sms.apiKey');
const secret = config.get('sms.apiSecret');
const from = config.get('sms.from');

const nexmo = new Nexmo({
  apiKey: api_key,
  apiSecret: secret,
  from: from
});

const callback = (error, response) => {
    if (error) {
      console.error(error)
    }
  
    if (response) {
      console.log(response)
    }
}

var send = function(to, msg) {
    console.log(to, from, api_key, secret, msg)
    try {
        nexmo.message.sendSms(from, to, msg, callback);
    } catch(error) {
        console.log(error)
    }
};


module.exports = {
    send
}