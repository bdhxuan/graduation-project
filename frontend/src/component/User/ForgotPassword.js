import React, { Fragment, useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import './Login.css';
import { Link, useNavigate, useLocation} from "react-router-dom";
import {getUser} from '../../Actions/userAction'

const ForgotPassword = () => {
   
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {isget} = useSelector( (state) => state.getuser);
  const [email, setEmail] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(getUser(myForm));
  };
  const redirect = location.search ? location.search.split("=")[1] : "/recovery";
  
  useEffect(() => {
    if(isget === false) {
        toast.error("Email không tồn tại!")
    }
    if(isget === true){
        toast.success("Mã OTP đã được gửi đến Email của bạn")
        navigate(redirect);
    }
  }, [dispatch, isget, navigate, redirect]);


    return (
      <Fragment>
        <div className="login container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
                <div className="glass">
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Tìm tài khoản của bạn</h1>
                    </div>
                    <form className='pt-20' onSubmit={Submit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="input text-center">
                                <span className='py-4 text-sm text-left text-gray-500'>
                                    Vui lòng nhập email tìm kiếm tài khoản của bạn.
                                </span>
                                <input  className="textbox3" type="text" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <Link to="/login"><button className="btn_forgot" type='submit'>Hủy</button></Link>
                            <button className="btn_forgot1" type='submit'>Tìm kiếm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </Fragment>
    )
  }

  
  export default ForgotPassword;