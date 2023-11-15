const User = require('../models/user')
const asyncHandle = require('express-async-handler')
const {gennerateAccessToken, gennerateRefreshToken} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')

const register = asyncHandle(async(req,res) => {
    const { email , password, firstname, lastname } = req.body
    if(!email || !password || !firstname || !lastname){
        return res.status(400).json({
            success: false,
            mes: "Missing input"
        })
    }

    const user = await User.findOne({email})
    if(user){
        throw new Error('User has existed!')
    }else{
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? "Rigster is successfully" : "Something went wrong"
        })
    }
})

//RefreshToken cấp mới accesstoken
//AccessToken xác thực người, phân quyền người dùng

const login = asyncHandle(async(req,res) => {
    const { email , password} = req.body
    if(!email || !password ){
        return res.status(400).json({
            success: false,
            mes: "Missing input"
        })
    }

    const user = await User.findOne({email})
    if(user && await user.isCorrectPassword(password)){
        //Không hiện password, role ra 
        const {password, role, ...userData} = user.toObject()
        const accessToken = gennerateAccessToken(user._id, role)
        const refreshToken = gennerateRefreshToken(user._id)
        //Lưu refreshToken vào database
        await User.findByIdAndUpdate(user._id, {refreshToken}, {new: true})
        //Lưu refreshToken vào cookie
        res.cookie('refreshToken', refreshToken,{httpOnly: true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }else{
        throw new Error("Invalid credentials!")
    }
    
})

const getCurrent = asyncHandle(async(req,res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: true,
        rs: user ? user : 'User not found'
    })
})

const refreshAccessToken = asyncHandle(async(req, res, )=>{
    //Lấy token từ cookie
    const cookie = req.cookies
    //Check xem có token hay không
    if(!cookie && !cookie.refreshToken){
        throw new Error('No refresh Token in cookies')
    }else{
        //Check token có hợp lệ hay không
        const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
        const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? gennerateAccessToken(response._id, response.role) : "Refresh token not matched"
        })
        
    }
})

const logout = asyncHandle(async(req, res)=>{
   const cookie = req.cookies
   if(!cookie || !cookie.refreshToken){
    throw new Error("No refresh token in cookies")
   }else{
    //Xóa refreshToken ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken},{refreshToken: ''}, {new: true})
    //Xóa refreshToken ở cookie trình duyệt
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
   }
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout
}