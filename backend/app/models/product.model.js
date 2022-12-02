const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nhập tên sản phẩm"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Nhập giá"],
    },
    description: {
        type: String,
        required: [true, "Nhập mô tả"],
    },
    images:[
        {
            image_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Nhập danh mục sản phẩm"],
    },
    stock: {
        type: Number,
        required: [true, "Nhập kho sản phẩm"],
        maxLength: [4, "Kho không được vượt quá 4 ký tự"],
        default:1,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Product", productSchema);