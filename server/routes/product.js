const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/createProduct', verifyAccessToken,isAdmin,ctrls.createProduct)
router.get('/', verifyAccessToken,isAdmin,ctrls.getProducts)
router.get('/:pid', ctrls.getProduct)
router.put('/:pid', verifyAccessToken,isAdmin,ctrls.updateProduct)
router.delete('/:pid', verifyAccessToken,isAdmin,ctrls.deleteProduct)


module.exports = router