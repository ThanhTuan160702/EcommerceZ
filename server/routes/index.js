const userRouter = require('./user')
const productRouter = require('./product')
const categoryRouter = require('./productCategory')
const blogCategoryRouter = require('./blogCategory')
const blog = require('./blog')
const brand = require('./brand')
const coupon = require('./coupon')
const { notFound, errHandle } = require('../middlewares/errHandle')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/blogcategory', blogCategoryRouter)
    app.use('/api/blog', blog)
    app.use('/api/brand', brand)
    app.use('/api/coupon', coupon)


    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes