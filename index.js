require('babel-register')({
  extensions : ['.es6', '.es', '.jsx', '.js'],
  presets : ['es2015'],
});

var server = require('./server/server');

server.default();
