const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/createBlog', verifyAccessToken,isAdmin, ctrls.createBlog)
router.get('/', verifyAccessToken,isAdmin, ctrls.getBlog)
router.put('/updateBlog/:bid', verifyAccessToken,isAdmin, ctrls.updateBlog)
router.delete('/deleteBlog/:bid', verifyAccessToken,isAdmin, ctrls.deleteBlog)
router.put('/like', verifyAccessToken, ctrls.likeBlog)


module.exports = router