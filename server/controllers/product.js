const Product = require('../models/product')
const asyncHandle = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandle(async(req, res)=>{
    if(Object.keys(req.body).length === 0) throw new Error('Missing Input')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const {title} = req.body
    const product = await Product.findOne({title})
    if(product){
        throw new Error('Product has existed!')
    }else{
        const newProduct = await Product.create(req.body)
        return res.status(200).json({
            success: newProduct ? true : false,
            mes: newProduct ? "Add product is successfully" : "Something went wrong"
        })
    }
})

const getProduct = asyncHandle(async(req, res)=>{
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
            success: product ? true : false,
            mes: product ? product : "Something went wrong"
    })
})

const getProducts = asyncHandle(async(req, res)=>{
    const products = await Product.find()
    return res.status(200).json({
        success: products ? true : false,
        mes: products ? products : "Something went wrong"
    })
})

const updateProduct = asyncHandle(async(req, res)=>{
    const { pid } = req.params
    const {title} = req.body
    const product = await Product.findOne({title})
    if(product && title!=req.body.title){
        throw new Error('Title has existed!')
    }else{
        if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
        const updatedProduct = await Product.findByIdAndUpdate(pid,req.body,{new: true})
        return res.status(200).json({
        success: updatedProduct ? true : false,
        mes: updatedProduct ? updatedProduct : "Something went wrong"
    })
    }
    
})

const deleteProduct = asyncHandle(async(req, res)=>{
    const {pid} = req.params
    const products = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: products ? true : false,
        mes: products ? "Deleted is successfully" : "Something went wrong"
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}