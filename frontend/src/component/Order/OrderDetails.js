import React, {Fragment, useEffect} from 'react';
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Title from "../layout/Title";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder, clearErrors} from "../../Actions/orderAction";
import Loader from "../layout/Loader/Loader";
import {deleteOrder} from "../../Actions/orderAction";
import { PayPalButton } from "react-paypal-button-v2";
import {DELETE_ORDER_RESET, ORDER_PAY_RESET} from "../../Constants/orderConstant";
import { useNavigate } from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';


const OrderDetails = () => {

  const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id }= useParams();

    const { order, error, loading} = useSelector((state) => state.orderDetails);
    
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const {success: successPay, error: errorPay} = useSelector((state) => state.orderPay);

    

    const deleteOrderHandle = (id) => {
      dispatch(deleteOrder(id));
    };

    const successPaymentHandler = (paymentResult) => {
      console.log(paymentResult);
      dispatch(payOrder(id, paymentResult));
      
    };

    useEffect(() => {
      if (error) {
        window.alert(error);
        dispatch(clearErrors());
      }
      if (deleteError) {
        window.alert(deleteError);
       dispatch(clearErrors());
     }
      if (isDeleted) {
        window.alert("Bạn muốn xóa đơn hàng này?");
       navigate("/orders");
       dispatch({ type: DELETE_ORDER_RESET });
     }

     if(errorPay) {
      window.alert(errorPay);
      dispatch(clearErrors());
     }
     if(successPay){
      toast.success("Thanh toán thành công");
      dispatch({type: ORDER_PAY_RESET})
     }

      dispatch(getOrderDetails(id));
  }, [dispatch, id, error, deleteError, navigate, isDeleted, errorPay, successPay]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Chi tiết đơn hàng" />
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
                <h2>Đơn hàng #{order && order._id}</h2>
                <h3>Thông tin vận chuyển:</h3>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p>Tên:</p>
                        <span>{order.shippingInfo && order.shippingInfo.username}</span>
                    </div>
                    <div>
                        <p>SĐT:</p>
                        <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                    </div>
                    <div>
                    <p>Địa chỉ:</p>
                    <span>
                        {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.ward}, ${order.shippingInfo.district}, ${order.shippingInfo.city}`}
                    </span>
                    </div>
                </div>
                <h3>Hình thức thanh toán:</h3>
                <div className="orderDetailsContainerBox">
                    <p>{order.paymentMethod}</p>
                    <div>
                    <p>Thành tiền:</p>
                    <span>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(order.totalPrice)}</span>
                    </div>
                </div>

                <h3>Trạng thái đơn hàng:</h3>
                <div className="orderDetailsContainerBox">
                    <div>
                    <p className={ order.orderStatus && order.orderStatus === "Đã giao hàng" ? "greenColor" : "redColor"}>
                        {order.orderStatus && order.orderStatus}
                    </p>
                    </div>
                    <br/>
                    <br/>
                    {order.isPaid? (
                      <p className={{color: "bg-green-700"}}>Đã thanh toán {order.paidAt}</p>
                    ): (
                      <p className={{color: "bg-red-700"}}>Chưa thanh toán</p>
                    )}
                </div>
                
            </div>

            <div className="orderDetailsCartItems">
              <h3>Sản phẩm:</h3>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems && order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.productname}
                      </Link>{" "}
                      <span>
                        {item.quantity} x {item.price}đ ={" "}
                        <b>{item.price * item.quantity}đ</b>
                      </span>
                    </div>
                  ))}
              </div>
                  
              <div className='payment'>
                {order.paymentMethod === "paypal" && !order.isPaid ? (
                  <div>
                    <h4>Thanh toán bằng Paypal sẽ đổi tiền Việt sang USD với tỷ giá 1.000đ = 0.04USD</h4>
                    <br/>
                    <PayPalButton
                      options={{clientId: "AVfyDF7y45U6grJ2RbJOUzljMgQrrwENbQzT7zLY4GPg5WutempZvKSIF_JPv3qNDDOj4j3vbj8qCojk"}}
                      amount={(order.totalPrice * 0.04)/1000}
                      onSuccess={successPaymentHandler}
                    />
                  </div>
                ):(
                  <p></p>
                )}
              
              </div>
             
            </div>
           
            
            
            {order.orderStatus === "Đang xử lý" ?(
              <button onClick={() => deleteOrderHandle(id)} className="btn_delete" type='submit'>HỦY</button>
            ): (
              <button className='btn_order'>Đơn hàng đang trên đường giao đến bạn</button>
              
            )} 
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetails
