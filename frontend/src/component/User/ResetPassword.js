import React, { Fragment, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import toast,{ Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import {resetPassword} from "../../Actions/userAction";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, success} = useSelector((state) => state.resetPassword);
    const {data:{email}} = useSelector( (state) => state.getuser);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("email", email)
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword)
      dispatch(resetPassword(myForm));
    };
    useEffect(() => {
      if(error){ 
        console.log(error)
        toast.error(error)
      }
      if(success) {
        toast.success("Đặt lại mật khẩu thành công");
        return navigate('/login')
      }
    }, [dispatch, error, navigate, success]);
  
    return (
      <Fragment>
        <div className="login container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
              <div className="glass" style={{ width : "50%"}}>
                <div className="title flex flex-col items-center">
                <h1 className='text-5xl font-bold'>Đặt lại mật khẩu</h1>
                </div>

                <form className='py-20' onSubmit={resetPasswordSubmit}>
                    <div className="textbox flex flex-col items-center gap-6">
                        <input className="textbox1" type="text" placeholder='Mật khẩu mới' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className="textbox2" type="text" placeholder='Xác nhận mật khẩu' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button className="btn_login" type='submit'>Đặt lại</button>
                    </div>

                </form>

              </div>
            </div>
          </div>
      </Fragment>
    );
  };
  
  export default ResetPassword;