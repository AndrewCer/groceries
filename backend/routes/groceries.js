const Router = require('koa-router');
const router = new Router();
const Ctrl = require('../controllers/groceries');

router.get('/', Ctrl.findAll);
router.get('/:id', Ctrl.find);

router.post('/', Ctrl.create);
router.put('/:id', Ctrl.update);

router.delete('/:id', Ctrl.remove);

module.exports = router.routes();