const { getCallback } = require('levelup/lib/common');
var database = require('./database');

var classPool = {
    Krieger: {spec1: false, spec2: false, spec3: false} ,
    Todesritter: {spec1: false, spec2: false, spec3: false},
    Magier: {spec1: false, spec2: false, spec3: false},
    Druide: {spec1: true, spec2: true, spec3: false}, 
    Schurke: {spec1: false, spec2: false, spec3: false},
    Paladin: {spec1: false, spec2: false, spec3: false},
    Hexenmeister: {spec1: true, spec2: false, spec3: false},
    Schamane: {spec1: false, spec2: false, spec3: false},
    Jaeger: {spec1: false, spec2: true, spec3: false},
    Priester:{spec1: false, spec2: false, spec3: false}};

function init() { 
        database.db.put('Klassen', JSON.stringify(classPool), function (err) {
            if (err) return console.log(oops);
            console.log('Klassen wurden angelegt');
            
        })
}
async function get() {
    return await new Promise((resolve,reject) => {
        database.db.get('Klassen', function(err,value) {
            if (err) {
                reject(err);
                return;
            }
            console.log('Klassen wurden geladen');
            resolve(JSON.parse(value));
        });
    })
}

function toggle(klasse, spec) {
    tempClasses = database.db.get();
    tempClasses[klasse][spec]=!tempClasses[klasse][spec];
    database.db.del('Klassen', function (err) {
        if (err) console.log('Fehler beim löschen');
    })
    database.db.put('Klassen', JSON.stringify(classPool), function (err) {
        if (err) return console.log(oops);
        console.log('Klassen wurden geupdated');
        
    })
}

module.exports = {init, get, toggle};
