import React, { Fragment, useState, useEffect } from "react";
import {generateOTP ,verifyOTP} from "../../Actions/userAction";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Login.css';
import {useSelector } from 'react-redux';

const Recovery = () => {
    const navigate = useNavigate();
    const {data:{email}} = useSelector((state) => state.getuser);
    const [OTP, setOTP] = useState("");
  
    // useEffect(() => {
    //   generateOTP(email).then((OTP) => {
    //     console.log(OTP)
    //     if(OTP) return toast.success('Mã OTP đã được gửi đến email của bạn!');
    //     return toast.error('Lỗi tạo mã OTP!')
    //   })
    // },[email]);
    async function onSubmit(e){
      e.preventDefault();
      try {
        console.log({code:OTP});
        console.log(email);
        let { status } = await verifyOTP({ email, code : OTP })
        console.log(status)
        if(status === 201){
          toast.success('Xác minh thành công!')
          return navigate('/reset')
        }  
      } catch (error) {
        return toast.error('Mã OTP sai! Kiểm tra lại Email của bạn')
      }
    }
    
    // function resendOTP(){
    //   let sentPromise = generateOTP(email);
    //   console.log(sentPromise)
    //     // if(status === 201){
    //     //   return toast.success('Mã OTP đã được gửi đến email của bạn!');
    //     // }
    //     // return toast.error('Lỗi tạo mã OTP!')
    //     toast.promise(sentPromise ,
    //       {
    //         loading: 'Sending...',
    //         success: <b>OTP has been send to your email!</b>,
    //         error: <b>Could not Send it!</b>,
    //       }
    //     );
    //     sentPromise.then((OTP) => {
    //       console.log(OTP)
    //     });
        
    //   }
  
    return (
      <Fragment>
        <div className="login container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex justify-center items-center h-screen'>
                <div className="glass">
                    <div className="title flex flex-col items-center">
                        <h1 className='text-5xl font-bold'>Recovery</h1>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Enter OTP to recover password.
                        </span>
                        </div>

                        <form className='pt-20' onSubmit={onSubmit}>

                            <div className="textbox flex flex-col items-center gap-6">

                                <div className="input text-center">
                                <span className='py-4 text-sm text-left text-gray-500'>
                                    Enter 6 digit OTP sent to your email address.
                                </span>
                                <input  onChange={(e) => setOTP(e.target.value) } className="textbox1" type="text" placeholder='OTP' />
                                </div>

                                <button className="btn_login" type='submit'>Recover</button>
                            </div>
                        </form>

                        {/* <div className="text-center py-4">
                        <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend</button></span>
                        </div> */}

                    </div>
                </div>
            </div>
      </Fragment>
    );
  };
  
  export default Recovery;