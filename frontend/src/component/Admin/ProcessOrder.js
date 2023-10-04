import React, { Fragment, useEffect, useState } from 'react'
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { Link, useParams } from "react-router-dom";
import { getOrderDetails,clearErrors, updateOrder} from "../../Actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../Constants/orderConstant";
import "./ProcessOrder.css";
import { useNavigate } from 'react-router-dom';


const ProcessOrder = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

    const [status, setStatus] = useState("");

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandle = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      window.alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      window.alert("Cập nhật đơn hàng thành công!");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate("/admin/orders")
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError, navigate]);

  return (
    <Fragment>
      <Title title="Process Order" />
      <div className="dashboard1">
        <Sidebar />
        <div className="newProductContainer1">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage" style={{ display: order.orderStatus === "Đã vận chuyển" ? "block" : "grid"}}>
              <div>
                <div className="confirmshippingArea">
                  <h2>Thông tin vận chuyển</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Tên:</p>
                      <span>{order.user && order.user.username}</span>
                    </div>
                    <div>
                      <p>SĐT:</p>
                      <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>{order.shippingInfo && 
                        `${order.shippingInfo.address}, ${order.shippingInfo.ward}, ${order.shippingInfo.district}, ${order.shippingInfo.city}`}
                      </span>
                    </div>
                  </div>

                  <h2>Thanh toán</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Thành tiền:</p>
                      <span>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(order.totalPrice && order.totalPrice)}</span>
                    </div>
                    <div>
                      <p>Hình thức thanh toán: </p><span>{order.paymentMethod}</span>
                    </div>
                    <div>
                      <p>Đặt hàng lúc: </p><span>{order.createAt}</span>
                    </div>
                  </div>

                  <h2>Trạng thái đơn hàng:</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p className={ order.orderStatus && order.orderStatus === "Đã vận chuyển" ? "greenColor" : "redColor" }>
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <h2>Sản phẩm của bạn:</h2>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems && order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} x {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(item.price)} ={" "}
                            <b>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(item.price * item.quantity)}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div style={{display: order.orderStatus === "Đã giao hàng" ? "none" : "block",}} >
                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandle}>
                  <h2>Tiến trình đặt hàng</h2>

                  <div>
                    {/* <AccountTreeIcon /> */}
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Thiết lập tiến trình xử lý</option>
                      {order.orderStatus === "Đang xử lý" && (
                        <option value="Đã giao cho đơn vị vận chuyển">Đã giao cho đơn vị vận chuyển</option>
                      )}

                      {order.orderStatus === "Đã giao cho đơn vị vận chuyển" && (
                        <option value="Đã giao hàng">Đã giao hàng</option>
                      )}
                    </select>
                  </div>

                  <Button id="createOrderBtn" type="submit" disabled={ loading ? true : false || status === "" ? true : false}>
                    Lưu
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessOrder
