const ApiError = require("../middleware/api-error");
const catchAsyncError = require("../middleware/catchAsyncError");
const { validate } = require("../models/user.model");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken.until");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const otpGenerator = require("otp-generator")

//dang ky tai khoan
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
      });
   
    const {username, email, password} = req.body;
    const user = await User.create({
        username, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
    });
 
     sendToken(user, 201, res);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
});

//dang nhap
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new ApiError(400, "Nhập email hoặc mật khẩu!"));
    }

    const user = await User.findOne({email }).select("+password");
    if(!user){
        return next(new ApiError(401, "Email hoặc mật khẩu không hợp lệ!"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ApiError(401, "Email hoặc mật khẩu không hợp lệ!"));
    }

    sendToken(user, 200, res);       
});

exports.getUser = catchAsyncError(async(req, res, next) => {
    const email = req.body.email;
    if(!email ) {
        return next(new ApiError(404, "Email không tồn tại"));
    }
    const user = await User.findOne({email })
    const username = user.username;
    const avatar = user.avatar;
    if(!user){
        return next(new ApiError(404, "Người dùng không tồn tại"));
    }
    res.status(201).json({
        success: true,
        email, username, avatar
    });    
});

//dang xuat
exports.logout = catchAsyncError(async(req, res, next) => {
    res.cookie("token", null, {
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công!",
    });
});

//lay thong tin chi tiet nguoi dung
exports.getUserDetails = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        user,
    });
});

//cap nhat password user
exports.updatePassword = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ApiError(404, "Mật khẩu cũ không đúng!"));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ApiError(404, "Mật khẩu không trùng khớp!"));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

});

//cap nhat ho so user
exports.updatePassword = catchAsyncError(async(req, res, next)=> {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ApiError(400, "Mật khẩu cũ không đúng!"));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ApiError(400, "Mật khẩu không trùng khớp!"));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async(req, res, next)=> {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
    };

    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
    }
});

//lay tat ca user -- admin
exports.getAllUser = catchAsyncError(async(req, res, next)=> {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

//lay mot user -- admin
exports.getSingleUser = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.params.id);
    
    if(!user) {
        return next(new ApiError(`Không tồn tại người dùng với Id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//cap nhat vai tro user -- admin
exports.updateUserRole = catchAsyncError(async(req, res, next)=> {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    }
    
    res.status(200).json({
        success: true,
        message: "Cập nhật hồ sơ thành công!"
    });
});

//xoa user -- admin
exports.deleteUser = catchAsyncError(async(req, res, next)=> {
    const user = await User.findById(req.params.id);

    //xoa khoi cloudinary
    if(!user){
        return next(new ApiError(404,`Không tồn tại người dùng với Id: ${req.params.id}`));
    }

    await user.remove();
    
    res.status(200).json({
        success: true,
        message: "Xóa người dùng thành công !"
    });
});

exports.generateOTP = catchAsyncError(async(req, res, next)=> {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
})

exports.verifyOTP = catchAsyncError(async(req, res, next)=>{
    const code = req.body.code;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; 
        req.app.locals.resetSession = true;
        return res.status(201).send({ message: 'Xác minh thành công!'})
    }
    return res.status(400).send({ error: "Mã OTP không hợp lệ"});
})


exports.createResetSession = catchAsyncError(async(req, res, next)=> {
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Mã hết hạn!"})
 })

 exports.resetPassword = catchAsyncError(async(req, res, next)=> {
    if(!req.app.locals.resetSession) return res.status(440).send({error : "Mã OTP hết hạn!"});
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ApiError(404, "Người dùng không tồn tại"))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ApiError(404, "Mật khẩu không trùng khớp"))
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res);
})

