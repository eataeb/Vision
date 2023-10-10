const { getCallback } = require('levelup/lib/common');
var database = require('./database');
const { errors } = require('levelup');

var classPool = {
    warrior: {arms: false, fury: false, protection: false} ,
    deathknight: {blood: false, frost: false, unholy: false},
    mage: {arcane: false, fire: false, frost: false},
    druid: {balance: true, feral: true, restoration: false}, 
    rogue: {assassination: false, combat: false, subtlety: false},
    paladin: {holy: false, protection: false, retribution: false},
    warlock: {affliction: true, destruction: false, demonology: false},
    shaman: {elemental: false, enhancement: false, restoration: false},
    hunter: {beastmastery: false, marksman: true, survival: false},
    priest:{holy: false, discipline: false, shadow: false}};

async function init() { 
    await database.db.get('Klassen', function(err,value) {
        if (err) {
            console.log("no collection found");
            database.db.put('Klassen', JSON.stringify(classPool), function (err) {
                if (err) return console.log(oops);
                console.log('Klassen wurden angelegt');
            });
        } else {
            console.log('Klassen collection already initialized');
        }
    });
}
async function get() {
    return await new Promise((resolve,reject) => {
        database.db.get('Klassen', function(err,value) {
            if (err) {
                console.log("fail");
                reject(err);
                return err;
            }
            console.log('Klassen wurden geladen');
            resolve(JSON.parse(value));
        });
    })
}

function toggle(klasse, spec) {
    var tempClasses;
    get().then(function(item) {
        tempClasses = item;
        temp = !tempClasses[klasse][spec];
        tempClasses[klasse][spec]=temp;
        database.db.del('Klassen', function (err) {
            if (err) console.log('Fehler beim löschen');
        })
        database.db.put('Klassen', JSON.stringify(tempClasses), function (err) {
            if (err) return console.log(oops);
            console.log('Klassen wurden geupdated');
        
    })
    });
    
}



module.exports = {init, get, toggle};
