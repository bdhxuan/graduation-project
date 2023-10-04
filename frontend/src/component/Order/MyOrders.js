import React, {Fragment, useEffect} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import Title from '../layout/Title';
import LaunchIcon from "@material-ui/icons/Launch";


const MyOrders = () => {

  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.myOrders);
  const { user,  loading} = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 300, flex: 0.8 },

    { field: "status", headerName: "Trạng thái", minWidth: 150, flex: 0.3, cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng" ? "greenColor": "redColor";
      },
    },

    { field: "itemsQty", headerName: "Số lượng sản phẩm", type: "number", minWidth: 150, flex: 0.5,},

    { field: "amount", headerName: "Thành tiền", type: "number", minWidth: 270, flex: 0.5,},

    // { field: "paid", headerName: "Thanh toán", type: "number", minWidth: 270, flex: 0.5,},

    { field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false, renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ]

  const rows = []

  orders && orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

   useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title={`Đơn hàng của ${user.name}`} />
          <div className="myOrdersPage">
            <p id="myOrdersHeading">Đơn hàng của tôi</p>
            <br />
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="myOrdersTable" autoHeight/>
        </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default MyOrders;
