var levelup = require('levelup');
var leveldown = require('leveldown');
const res = require('express/lib/response');
const { json } = require('express/lib/response');

// 1) Create our store
var db = levelup(leveldown('./db'));

module.exports = {db};