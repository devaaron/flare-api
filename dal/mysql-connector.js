var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aegrit"
});

var getFriends = function(id, callbackFn) {
    if(id === undefined) {
        throw new Error('id is undefined');
    } else if(id.match(/\d{15,20}/g)) {
        var query = "SELECT * FROM user.friend WHERE discord_user_id = " + id + ";"
        querySql(query, callbackFn);
    } else {
        throw new Error('id is not valid: id='+id);
    }
};

var querySql = function(query, callbackFn) {
    con.connect(function(err) {
        if (err) {
            conneted = false;
            throw err;
        }
    });

    con.query(query, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            callbackFn(results[0] != null ? results[0].relationship_data : null)
        }
    });

    con.end();
}


module.exports = {
    getFriends
}