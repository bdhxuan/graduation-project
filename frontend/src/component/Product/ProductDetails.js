import React, { Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails, clearErrors} from "../../Actions/productAction";
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from "../layout/Title";
import {addItemsToCart} from "../../Actions/cartAction";
import ProductCard from "../Home/ProductCard";
import {getNewArrivals} from "../../Actions/filterAction"


const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const {product, error} = useSelector((state) =>  state.productDetails)

    const { newArrivals} = useSelector((state) => state.filters);

    const [quantity, setQuantity] = useState(1);

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


    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }

         dispatch(getProductDetails(id));
        
    }, [dispatch, id, error]);


    useEffect(() => {
      dispatch(getNewArrivals());
    }, [dispatch]);

    return (
        <Fragment>
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
                    <div className="detail-3">
                         <h1>
                            {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(product.price)}
                        </h1>
                        <div className="detail-3-1">
                            <div className="detail-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type="number" />
                                <button onClick={increaseQuantity}>+</button>
                            </div>{""}
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