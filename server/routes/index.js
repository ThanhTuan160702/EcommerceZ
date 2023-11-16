const userRouter = require('./user')
const productRouter = require('./product')
const categoryRouter = require('./productCategory')
const blogCategoryRouter = require('./blogCategory')
const blog = require('./blog')
const { notFound, errHandle } = require('../middlewares/errHandle')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/blogcategory', blogCategoryRouter)
    app.use('/api/blog', blog)


    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes