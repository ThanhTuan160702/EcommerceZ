const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.put('/ratings', verifyAccessToken,ctrls.ratings)
router.post('/createProduct', verifyAccessToken,isAdmin,ctrls.createProduct)
router.get('/', verifyAccessToken,isAdmin,ctrls.getProducts)
router.get('/:pid', ctrls.getProduct)
router.put('/:pid', verifyAccessToken,isAdmin,ctrls.updateProduct)
router.delete('/:pid', verifyAccessToken,isAdmin,ctrls.deleteProduct)
router.put('/uploadimg/:pid', verifyAccessToken,isAdmin, uploader.array('images', 10),ctrls.uploadImagesProduct)



module.exports = router