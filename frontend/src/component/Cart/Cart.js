import React, {Fragment} from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart} from "../../Actions/cartAction";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useNavigate } from 'react-router-dom';


const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { cartItems } = useSelector((state) => state.cart);
    const increaseQuantity = (id, quantity, stock) => {
        const newqt = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newqt));
    };

    const decreaseQuantity = (id, quantity) => {
      const newqt = quantity - 1;
      if (1 >= quantity) {
      return;
      }
      dispatch(addItemsToCart(id, newqt));
    };

    const deleteCartItems = (id) => {
      dispatch(removeItemsFromCart(id));
      window.alert("Bạn muốn xóa sản phẩm ra khỏi giỏ hàng?");
    };

    const checkoutHandle = () => {
      navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
         <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <h4>Chưa có sản phẩm nào trong giỏ hàng</h4>
          <Link to="/products">Đi đến trang sản phẩm</Link>
        </div>
      ): (
        <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
              <p>Sản phẩm</p>
              <p>Số lượng</p>
              <p>Tạm tính</p>
            </div>

            {cartItems && cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity( item.product, item.quantity, item.stock)}>+</button>
                  </div>
                  <p className="cartSubTotal">{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(`${item.price * item.quantity}`)}</p> 
                </div>
             ))}

            <div className="cartTotal">
              <div></div>
              <div className="cartTotalBox">
                <p>TẠM TÍNH:</p>
                <p>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(`${cartItems.reduce((acc, item) => acc + item.quantity * item.price,0)}`)}</p>
              </div>
              <div></div>
              <div className="checkoutBtn">
                <button onClick={checkoutHandle}>TIẾN HÀNH THANH TOÁN</button>
              </div>
              
            </div>
             
          </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default Cart;
