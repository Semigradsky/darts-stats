var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var jsonServer = require('json-server');
var config = require('./webpack.config');

var app = jsonServer.create();
var compiler = webpack(config);
var router = jsonServer.router('db.json');

var port = 3000;

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.use('/api', router);
app.listen(port);

console.log('Now just open http://localhost:' + port);
