import './App.css';
import Header from "./component/layout/Header/Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Webfont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails"
import {useEffect} from "react"; 
import Products from "./component/Product/Products";
import Register from './component/User/Register';
import Login_User from "./component/User/Login_User"
import Login_Admin from './component/User/Login_Admin';
import ForgotPassword from './component/User/ForgotPassword';
import Recovery from './component/User/Recovery';
import ResetPassword from './component/User/ResetPassword';
import store from "./store";
import { loadUser } from './Actions/userAction';
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdatePassword from './component/User/UpdatePassword';
import UpdateProfile from "./component/User/UpdateProfile";
import Cart from "./component/Cart/Cart"
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import PrivateRoute from './component/Route/PrivateRoute';
import Dashboard from './component/Admin/Dashboard';
import ListProduct from './component/Admin/ListProduct';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct";
import ListOrder from './component/Admin/ListOrder';
import ProcessOrder from "./component/Admin/ProcessOrder";
import ListUser from './component/Admin/ListUser';
import UpdateUser from "./component/Admin/UpdateUser";
import ListCategory from './component/Admin/ListCategory';
import NewCategory from './component/Admin/NewCategory';
import ProductReviews from './component/Admin/ProductReviews';
import FilterProductByPriceAsc from './component/Product/FilterProductByPriceAsc';
import FilterProductByPriceDesc from './component/Product/FilterProductByPriceDesc';

function App() {
  
const { isAuthenticated} = useSelector((state) => state.user);
  useEffect(() => {
  Webfont.load({
    google:{
      families: ["Roboto", "Droid Sans", "Chilanka"]
    },
  });

  store.dispatch(loadUser());
}, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>} />

        <Route exact path="/product/:id" element={<ProductDetails/>} />

        <Route exact path="/products" element={<Products/>} />

        <Route path="/products/:keyword" element={<Products/>} />

        <Route exact path="/login" element={<Login_User/>} />

        <Route exact path="/admin/login" element={<Login_Admin/>} />

        <Route exact path="/register" element={<Register/>} />

        <Route exact path="/forgot" element={<ForgotPassword/>} />

        <Route exact path="/recovery" element={<Recovery/>} />

        <Route path="/reset" element={<ResetPassword/>} />

        <Route path='/account' element={<PrivateRoute isAuthenticated={isAuthenticated}> <Profile/> </PrivateRoute>}/>

        <Route path='/password/update' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/password/update"> <UpdatePassword/> </PrivateRoute>}/>

        <Route path='/me/update' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/me/update"> <UpdateProfile/> </PrivateRoute>}/>

        <Route exact path="/cart" element={<Cart/>} />

        <Route path='/login/shipping' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/login/shipping"> <Shipping/> </PrivateRoute>}/>

        <Route path='/order/confirm' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/order/confirm" ><ConfirmOrder/></PrivateRoute>}/>

        <Route path='/order/success' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/order/success"> <OrderSuccess/> </PrivateRoute>}/>

        <Route path='/orders' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/orders"> <MyOrders/> </PrivateRoute>}/>

        <Route path='/order/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} redirect="/order/:id"> <OrderDetails/> </PrivateRoute>}/>

        <Route path='/admin/dashboard' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/dashboard"> <Dashboard/> </PrivateRoute>}/>

        <Route path='/admin/products' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/products"> <ListProduct/> </PrivateRoute>}/>

        <Route path='/admin/product/new' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/product/new"> <NewProduct/> </PrivateRoute>}/>

        <Route path='/admin/product/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/product/:id"> <UpdateProduct/> </PrivateRoute>}/>

        <Route path='/admin/orders' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/orders"> <ListOrder/> </PrivateRoute>}/>

        <Route path='/admin/order/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/order/:id"> <ProcessOrder/> </PrivateRoute>}/>
        
        <Route path='/admin/users' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/users"> <ListUser/> </PrivateRoute>}/>

        <Route path='/admin/user/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/user/:id"> <UpdateUser/> </PrivateRoute>}/>

        <Route path='/admin/categories' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/categories"> <ListCategory/> </PrivateRoute>}/>

        <Route path='/admin/category/new' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/category/new"> <NewCategory/> </PrivateRoute>}/>

        <Route path='/admin/reviews' element={<PrivateRoute isAuthenticated={isAuthenticated} isAdmin={true} redirect="/admin/reviews"> <ProductReviews/> </PrivateRoute>}/>

        <Route path='/filter/priceasc' element={<FilterProductByPriceAsc/>} />

        <Route path='/filter/pricedesc' element={<FilterProductByPriceDesc/>} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
