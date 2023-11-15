const userRouter = require('./user')
const { notFound, errHandle } = require('../middlewares/errHandle')

const initRoutes = (app) => {
    app.use('/api/user', userRouter)



    app.use(notFound)
    app.use(errHandle)
}

module.exports = initRoutes