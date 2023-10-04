const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        username: {
            type: String,
            required: [true, "Nhập tên"],
            maxLength:[30, "Tên không thể vượt quá 30 ký tự!"],
        },
        address: {
            type: String, 
            required: true,
        },
        ward: {
            type: String, 
            required: true,
        },
        district: {
            type: String, 
            required: true,
        },
        city: {
            type: String, 
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String, 
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String, 
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    paymentMethod: {
        type: String
    },
    paymentResult: {
        id: {
          type: String,
        },
        status: {
          type: String,
        },
        update_time: {
          type: String,
        },
        email_address: {
          type: String,
        },
      },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Đang xử lý",
    },
    deliveryAt: {
        type: Date,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    paidAt: {
        type: Date,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongoose.model("Order", orderSchema);