module.exports = (router) => {
  router.prefix('/api');
  router.use('/groceries', require('./groceries'));
}
