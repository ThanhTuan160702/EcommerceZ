const userRouter = require('./user')
const productRouter = require('./product')
const { notFound, errHandle } = require('../middlewares/errHandle')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)



    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes