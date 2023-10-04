import React, {useEffect} from 'react';
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import Title from '../layout/Title'
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../Actions/productAction";
import { getAllOrders} from "../../Actions/orderAction.js";
import { getAllUsers } from "../../Actions/userAction.js";
import { Link } from "react-router-dom";


const Dashboard = () => {

    const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders} = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  

  const columns = [
  
    { field: "name", headerName: "Sản phẩm", minWidth: 200, flex: 0.5},

    { field: "rating", headerName: "Đánh giá(sao)", minWidth: 50, flex: 0.5},

];

const rows = [];

products && products.forEach((item) => {
 item.reviews.forEach((rev) => {
    if(rev.rating === 5)
    rows.push({
      id: item._id,
      name: item.name,
      rating: rev.rating
    });
  });
});

const columns2 = [

  { field: "id", headerName: "ID đơn hàng", minWidth: 50, flex: 0.5},
  
  { field: "name", headerName: "User", minWidth: 50, flex: 0.5},

  { field: "totalPrice", headerName: "Giá trị", minWidth: 100, flex: 0.5},

  { field: "date", headerName: "Ngày đặt", minWidth: 100, flex: 0.5},

];

const rows2 = [];

orders && orders.filter((item) => {
  if(item.totalPrice > 20000000)
  rows2.push({
    id: item._id,
    name: item.shippingInfo.username,
    totalPrice: item.totalPrice,
    date: item.createAt
  });
});

  return (
    <div className="dashboard">
      <Title title="Quản trị" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Quản trị</h1>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Sản phẩm</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Đơn hàng</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{users && users.length}</p>
            </Link>
            <Link>
              <p>Doanh thu</p>
              {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(totalAmount)}
            </Link>
          </div>
        </div>
        <div className='ListContainer'>
          <div className="productListContainer1">
            <h2>Sản phẩm có đánh giá cao nhất</h2>
            <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick className="productListTable1" autoHeight />
        </div>
        <div className="productListContainer2">
            <h2>Đơn hàng giá trị cao nhất</h2>
            <DataGrid rows={rows2} columns={columns2} pageSize={5} disableSelectionOnClick className="productListTable2" autoHeight />
        </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
