const BodyParser = require('koa-bodyparser');
const Cors = require('@koa/cors');
const Helmet = require('koa-helmet');
const Koa = require('koa');
const Logger = require('koa-logger');
const mongoose = require('mongoose');
const respond = require('koa-respond');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger());
}

app.use(Cors());
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));

app.use(respond());

// API routes
require('./routes')(router);
app.use(router.routes());
app.use(router.allowedMethods());

// Mongoose setup
const url = 'mongodb://localhost/groceries';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url);
})

db.on('error', err => {
  console.error('connection error:', err);
})

module.exports = app;
