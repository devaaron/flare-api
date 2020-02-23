# flare-data-api-mock

## Setup Steps

* npm install
* node .

## Resources
* users
* groups
* messages

## Example Requests

GET: 

request:  `http://localhost:3001/flare/api/groups/2`
response: ```
{
    "id": 2,
    "users": [
        {
            "userId": 1
        },
        {
            "userId": 2
        },
        {
            "userId": 3
        }
    ],
    "displayName": "core homies"
}```

GET:

request: `http://localhost:3001/flare/api/groups/?limit=2`
response: ```
[
    {
        "id": 1,
        "users": [
            {
                "userId": 1
            },
            {
                "userId": 2
            },
            {
                "userId": 3
            },
            {
                "userId": 4
            },
            {
                "userId": 5
            }
        ],
        "displayName": "first group"
    },
    {
        "id": 2,
        "users": [
            {
                "userId": 1
            },
            {
                "userId": 2
            },
            {
                "userId": 3
            }
        ],
        "displayName": "core homies"
    }
]```