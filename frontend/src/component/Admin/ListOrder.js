import React, {Fragment, useEffect} from 'react';
import "./ListProduct.css"
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, deleteOrder, getAllOrders} from "../../Actions/orderAction";
import { Link} from "react-router-dom";
import { Button } from "@material-ui/core";
import {DELETE_ORDER_RESET} from "../../Constants/orderConstant";
import { useNavigate } from 'react-router-dom';


const ListOrder = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandle = (id) => {
    dispatch(deleteOrder(id));
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
       window.alert("Xóa đơn hàng thành công");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const columns = [
    // { field: "id", headerName: "Mã đơn hàng", minWidth: 300, flex: 1 },

    { field: "status", headerName: "Trạng thái", minWidth: 150, flex: 0.5, cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng" ? "greenColor" : "redColor";},
    },

    { field: "itemsQty", headerName: "Số lượng", type: "number", minWidth: 150, flex: 0.4,},

    { field: "amount", headerName: "Thành tiền", type: "number", minWidth: 270, flex: 0.7, },

    { field: "actions", flex: 0.6, headerName: "Actions", minWidth: 150, type: "number", sortable: false, renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <i className='fa-regular fa-pen-to-square'></i>
            </Link>

            <Button onClick={() => deleteOrderHandle(params.getValue(params.id, "id"))}>
              <i className='fa-solid fa-trash'></i>
            </Button>
          </Fragment>
        );
      },
    },
  ]

  const rows = [];

  orders && orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
     <Fragment>
      <Title title={"Tất cả đơn hàng"} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">Tất cả đơn hàng</h1>

          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight/>
        </div>
      </div>
    </Fragment>
  )
}

export default ListOrder;
 