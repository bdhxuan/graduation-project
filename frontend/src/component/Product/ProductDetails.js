import React, { Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails, clearErrors, newReview} from "../../Actions/productAction";
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from "../layout/Title";
import {addItemsToCart} from "../../Actions/cartAction";
import ProductCard from "../Home/ProductCard";
import {getNewArrivals} from "../../Actions/filterAction"
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@material-ui/core";
import {NEW_REVIEW_RESET} from "../../Constants/productConstant";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard";
import toast,{ Toaster } from 'react-hot-toast';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const {product, error} = useSelector((state) =>  state.productDetails)

    const { newArrivals} = useSelector((state) => state.filters);

    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const { isAuthenticated} = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qt = quantity + 1;
        setQuantity(qt);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qt = quantity - 1;
        setQuantity(qt);
    };

    const addToCartHandle = () => {
        dispatch(addItemsToCart(id, quantity));
        window.alert("Sản phẩm đã được thêm vào giỏ hàng!");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };
      

    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            window.alert(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Đánh giá sản phẩm thành công");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id));
        
    }, [dispatch, id, error, reviewError, success]);


    useEffect(() => {
      dispatch(getNewArrivals());
    }, [dispatch]);

    return (
        <Fragment>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Title className="titledetail" title={`${product.name}`}></Title>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images && product.images.map((item, i) => (
                            <img className="CarouselImage"  src={item.url} alt={`${i} Slide`} />
                        ))}
                    </Carousel>
                </div>

                <div>
                    <div className="detail-1">
                        <h2>{product.name}</h2>
                        {/* <p>Mã sản phẩm: {product._id}</p> */}
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews} Đánh giá)
                        </span>
                    </div>
                    <div className="detail-3">
                         <h1>
                            {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(product.price)}
                        </h1>
                        <div className="detail-3-1">
                            <div className="detail-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type="number" />
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <button disabled={product.stock <1 ? true : false} type="button" className="btn btn-primary" onClick={addToCartHandle} >thêm vào giỏ hàng</button>
                        </div>
                        <p>Số lượng:
                            <b className="redColor"> {product.stock}</b>
                        </p>
                         <p> Tình trạng:
                            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? " Hết hàng" : " Còn hàng"}
                            </b>
                        </p>
                    </div>
                    <div className="detail-4">
                        Mô tả: <p>{product.description}</p>
                    </div>
                    
                </div>
            </div>
            
            {isAuthenticated ? (
               <>
               <button onClick={submitReviewToggle} className="submitReview ">Đánh giá sản phẩm</button>
               <h3 className="reviewHeading">Đánh giá</h3>
               <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large" />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Hủy
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Gửi
              </Button>
            </DialogActions>
          </Dialog></>
              )
            :(
            <p></p>
          )}
           

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">Chưa có đánh giá</p>
          )}
            <h2 className="title1">Gợi ý sản phẩm mới cho bạn</h2>
            <div className="container" id="container">
              {newArrivals && newArrivals.map((newArrival) => (
                        <ProductCard key={newArrival._id} product={newArrival}/>
                    ))}
            </div>
        </Fragment>      
    );
};

export default ProductDetails;