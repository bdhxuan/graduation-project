import React, { Fragment, useEffect, useState} from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import toast,{ Toaster } from 'react-hot-toast';
import { login} from '../../Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import avatar from '../../images/user.png'

const Login_Admin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {loginError, loginSuccess, isAuthenticated} = useSelector( (state) => state.user);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const redirect = location.search ? location.search.split("=")[1] : "/admin/dashboard";
  
  useEffect(() => {
    if(loginError !== "" && loginSuccess === "") {
        toast.error("Email hoặc mật khẩu sai!")
    }
    if(isAuthenticated){
        toast.success("Đăng nhập thành công")
        navigate(redirect);
    }
  }, [dispatch, loginError, loginSuccess, navigate, isAuthenticated, redirect]);


  return (
    <Fragment>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="login container mx-auto">
          <div className='flex justify-center items-center h-screen'>
            <div className="glass">
                <div className="title flex flex-col items-center">
                  <h1 className='text-5xl font-bold'>Đăng nhập</h1>
                </div>

                <form className='py-1' onSubmit={loginSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img src={avatar} className="profile_img" alt="avatar" />
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input className="textbox1" type="text" placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                        <input className="textbox2" type="text" placeholder='Mật Khẩu' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <button className="btn_login" type='submit'>Đăng nhập</button>
                    </div>

                    <div className="text-center py-4">
                      <span className='text-gray-500'><Link className='text-red-500' to="/forgot">Quên mật khẩu?</Link></span><br/>
                      <span className='text-gray-500'>Không phải thành viên<Link className='text-red-500' to="/register">Đăng ký ngay</Link></span>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Login_Admin;