//curl -X POST https://messages-sandbox.nexmo.com/v0.1/messages \
//-u 'd7d46a1d:7QQwHU8StukTg49M' \
//-H 'Content-Type: application/json' \
//-H 'Accept: application/json' \
//-d '{
//    "from": { "type": "messenger", "id": "107083064136738" },
//    "to": { "type": "messenger", "id": "4009079502491227" },
//    "message": {
//      "content": {
//        "type": "text",
//        "text": "This is a Facebook Messenger Message sent from the Messages API"
//      }
//    }
//  }'

const express = require('express');
const rest = express();