const { getCallback } = require('levelup/lib/common');
var database = require('./database');

var superuser = {name: "admin", password: ""
}

function init() {
    database.db.put('auth', JSON.stringify(superuser), function (err) {
        if (err) return console.log(oops);
        console.log('auth');

    })

}