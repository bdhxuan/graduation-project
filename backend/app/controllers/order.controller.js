const Order = require("../models/order.model");
const ApiError = require("../middleware/api-error");
const Product = require("../models/product.model");
const catchAsyncError = require("../middleware/catchAsyncError");

//tao don hang moi
exports.createOrder = catchAsyncError(async (req, res, next)=> {
    const {
        shippingInfo, 
        orderItems, 
        shippingPrice, 
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo, 
        orderItems, 
        shippingPrice, 
        totalPrice,
        user: req.user._id,
        createAt: Date.now()
    });

    res.status(201).json({
        success: true,
        order,
    });
});

//lay chi tiet don hang
exports.getSingleOrder = catchAsyncError( async(req, res, next)=> {
    const order = await Order.findById(req.params.id).populate(
        "user", 
        "username email"
        );  //populate hoat dong tuong tu left join trong sql

    if(!order) {
        return next(new ApiError(404, "Không tồn tại đơn hàng với Id này"));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

//lay don hang cua toi
exports.myOrders = catchAsyncError( async(req, res, next)=> {
    const orders = await Order.find({user: req.user._id});
    if(!orders) {
        return next(new ApiError(404, "Không tồn tại đơn hàng với Id này"));
    }
    res.status(200).json({
        success: true,
        orders,
    });
});

//lay tat ca don hang --admin
exports.getAllOrders = catchAsyncError( async(req, res, next)=> {
    const orders = await Order.find();

    let totalAmount =0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

//cap nhat don hang -- admin
exports.updateOrder = catchAsyncError( async(req, res, next)=> {
    const order = await Order.findById(req.params.id);

     if(!order) {
        return next(new ApiError(404, "Không tồn tại đơn hàng với Id này"));
    }

    if(order.orderStatus === "Đã giao hàng") {
        return next(new ApiError(404, "Đơn hàng này đã được giao!"));
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;
    // if(req.body.status === "Đã giao hàng"){
    //     order.deliveredAt = Date.now();
    // }

   await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave: false});
}

//xoa tat ca don hang --admin
exports.deleteOrder = catchAsyncError( async(req, res, next)=> {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ApiError(404, "Không tồn tại đơn hàng với Id này"));
    }

    await order.remove();
    res.status(200).json({
        success: true,
    });
});