const Blog = require('../models/blog')
const asyncHandle = require('express-async-handler')

const createBlog = asyncHandle(async(req, res)=>{
    const {title, description, category} = req.body
    if(!title || !description || !category){
        throw new Error('Missing input')
    }
    const reponse = await Blog.create(req.body)
    return res.status(200).json({
        success: reponse ? true : false,
        mes: reponse ? "Add blog is successfully" : "Something went wrong"
    })
})

const getBlog = asyncHandle(async(req, res)=>{
    const reponse = await Blog.find()
    return res.status(200).json({
        success: reponse ? true : false,
        mes: reponse 
    })
})

const updateBlog = asyncHandle(async(req, res)=>{
    const { bid } = req.params
    const reponse = await Blog.findByIdAndUpdate(bid, req.body, {new: true})
    return res.status(200).json({
        success: reponse ? true : false,
        mes: reponse ? "Update blog is successfully" : "Something went wrong" 
    })
})

const deleteBlog = asyncHandle(async(req, res)=>{
    const { bid } = req.params
    const reponse = await Blog.findByIdAndDelete(bid, {new: true})
    return res.status(200).json({
        success: reponse ? true : false,
        mes: reponse ? "Delete blog is successfully" : "Something went wrong" 
    })
})

const likeBlog = asyncHandle(async(req, res)=>{
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) throw new Error("Missing Input")
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(ele=>ele.toString() === _id)
    console.log(blog?.likes)
    if(alreadyDisliked){
        const response  = await Blog.findByIdAndUpdate(bid,{$pull: {dislikes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response 
        })
    }
    const isLiked = blog?.likes?.find(ele=>ele.toString() === _id)
    if(isLiked){
        const response = await Blog.findByIdAndUpdate(bid,{$pull: {likes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response 
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid,{$push: {likes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response 
        })
    }
})

const dislikeBlog = asyncHandle(async(req, res)=>{
    const {_id} = req.user
    const {bid} = req.body
    if(!bid) throw new Error("Missing Input")
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.likes?.find(ele=>ele.toString() === _id)
    if(alreadyDisliked){
        const response  = await Blog.findByIdAndUpdate(bid,{$pull: {likes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response 
        })
    }
    const isLiked = blog?.dislikes?.find(ele=>ele.toString() === _id)
    if(isLiked){
        const response = await Blog.findByIdAndUpdate(bid,{$pull: {dislikes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response 
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid,{$push: {dislikes: _id}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response 
        })
    }
})

module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog
}