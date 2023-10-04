import React, {Fragment, useState} from 'react';
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../Actions/cartAction";
import Title from '../layout/Title';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import toast,{ Toaster } from 'react-hot-toast';


const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [username, setUsername] = useState(shippingInfo.username)
    const [address, setAddress] = useState(shippingInfo.address);
    const [ward, setWard] = useState(shippingInfo.ward);
    const [district, setDistrict] = useState(shippingInfo.district);
    const [city, setCity] = useState(shippingInfo.city);
    const [phone, setPhone] = useState(shippingInfo.phone);

    const shippingSubmit = (e) => {
    e.preventDefault();

    if (phone.length < 10 || phone.length > 10) {
      toast.error("SĐT có độ dài là 10");
      return;
    }
    toast.success("")
    dispatch( saveShippingInfo({ username, address, ward, district, city, phone}));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
        <Title title="Địa chỉ giao hàng" />
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
            <div className="shippingBox">
                <div className="title flex flex-col items-center">
                  <h1 className='text-5xl font-bold'>Địa chỉ giao hàng</h1>
                </div>
                <form className='py-1 form' encType="multipart/form-data"onSubmit={shippingSubmit}>
                  <div >
                    <input className='textbox1' type="text" placeholder="Họ Tên" required value={username} onChange={(e) => setUsername(e.target.value)} />
    
                    <input className='textbox2' type="number" placeholder="SĐT:" required value={phone} onChange={(e) => setPhone(e.target.value)} size="10" />
                
                    <input className='textbox2' type="text" placeholder="Tỉnh/Thành Phố:" required value={city} onChange={(e) => setCity(e.target.value)} />
                
                    <input className='textbox2' type="text" placeholder="Quận/Huyện:" required value={district} onChange={(e) => setDistrict(e.target.value)} />
               
                    <input className='textbox2' type="text" placeholder="Xã/Phường:" required value={ward} onChange={(e) => setWard(e.target.value)} />
                
                    <input className='textbox2' type="text" placeholder="Địa chỉ chi tiết:" required value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                   
                    <input  type="submit" value="tiếp tục" className="shippingBtn"  />
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping
