import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, CLEAR_CART} from "../Constants/cartConstant";
import axios from "axios";

//Them vao gio hang
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));  //stringify chuyen Object sang JSON
};

//xoa san pham ra khoi gio hang
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//luu thong tin giao hang
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};


export const clearCart = () => async(dispatch) => {
  dispatch({
    type: CLEAR_CART,
    payload: null,
  })
}