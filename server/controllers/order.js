const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandle = require('express-async-handler')

const createOrder = asyncHandle(async(req, res)=>{
    const { _id } = req.user
    const selectedCoupon = await Coupon.findById(req.body.coupon)
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))


    let total = userCart?.cart?.reduce((sum,el) => el.product.price * el.quantity + sum, 0)

    if(selectedCoupon){
        totalDiscount = Math.round(total-(20/100*total))
        const rs = await Order.create({product: products, total: totalDiscount, orderBy: _id, coupon: req.body.coupon})
        return res.status(200).json({
        success: rs ? true : false,
        mes: rs ? rs : "Something went wrong"
    })
    }
    const rs = await Order.create({product: products, total, orderBy: _id})
    return res.status(200).json({
        success: rs ? true : false,
        mes: rs ? rs : "Something went wrong"
    })
})

const updateStatus = asyncHandle(async(req, res)=>{
    const { oid } = req.params
    const update = req.body
    if(!update) throw new Error('Missing Input')
    const rs = await Order.findByIdAndUpdate(oid, {status: update}, {new: true})
    return res.status(200).json({
        success: rs ? true : false,
        mes: rs ? "Update is successfully" : "Something went wrong"
    })
})

const getOrders = asyncHandle(async(req, res)=>{
    const rs = await Order.find()
    return res.status(200).json({
        success: rs ? true : false,
        mes: rs ? rs : "Something went wrong"
    })
})

const getUserOrder = asyncHandle(async(req, res)=>{
    const { _id } = req.user
    const rs = await Order.find({orderBy: _id})
    return res.status(200).json({
        success: rs ? true : false,
        mes: rs ? rs : "Something went wrong"
    })
})

module.exports = {
    createOrder,
    updateStatus,
    getOrders,
    getUserOrder
}