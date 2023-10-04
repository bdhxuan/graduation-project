import React, { Fragment, useEffect} from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import "./OrderSuccess.css";
import {useDispatch } from "react-redux";
import {clearCart} from "../../Actions/cartAction"
import { useNavigate } from 'react-router-dom';


const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vieworder = () => {
    navigate("/orders")
  }
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  return (
    <Fragment>
        <CheckoutSteps activeStep={2} />
        <div className="orderSuccess">
            <i className="fa-sharp fa-solid fa-circle-check"></i>
            <br/>
            <h3>Đặt hàng thành công! Đơn hàng của bạn đang được xử lý. Vui lòng chuẩn bị để thanh toán cho shipper </h3>
            
            <button onClick={vieworder} className="btn_success">Xem đơn hàng</button>
        </div>
    </Fragment>
  );
};

export default OrderSuccess;