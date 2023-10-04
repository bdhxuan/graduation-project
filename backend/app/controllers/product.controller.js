const ApiError = require("../middleware/api-error");
const Product = require("../models/product.model");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/api-feature");
const cloudinary = require("cloudinary");


//tao san pham moi -- admin
exports.createProduct = catchAsyncError(async(req, res, next) => {
    
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "images",
        });

        imagesLinks.push({
            image_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
        message: "Thêm sản phẩm thành công!"
    });
});

exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 12;

    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter()
        

    let products = await apiFeature.query;

    let filterProductsCount = products.length;

    apiFeature.pagination(resultPerPage); //phan trang

    products = await apiFeature.query.clone();
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filterProductsCount,
    })
});

//lay tat ca san pham -- admin
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
     res.status(200).json({
        success: true,
        product,
    })
});


//cap nhat san pham -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if(!product) {
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // xoa hinh ra khoi Cloudinary
        for (let i = 0; i < product.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].image_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "images",
        });

        imagesLinks.push({
            image_id: result.public_id,
            url: result.secure_url,
        });
        }

        req.body.images = imagesLinks;
  }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product,
        message: "Cập nhật sản phẩm thành công!"
    })
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].image_id);
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công!"
    })
});

//tao danh gia san pham
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
//lay tat ca danh gia san pham
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//xoa danh gia
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});