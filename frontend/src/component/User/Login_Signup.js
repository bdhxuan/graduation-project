import React, { Fragment, useRef, useState, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Login_Signup.css";
import { useDispatch, useSelector } from 'react-redux';
import { login, register ,clearErrors} from '../../Actions/userAction';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated} = useSelector( (state) => state.user);
  const location = useLocation();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });


  const { username, email, password} = user;
  
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("username", username);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };

 const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    
    if (error) {
      window.alert(error)
      dispatch(clearErrors());
    }
    if(isAuthenticated ){
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);



  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }
  return (
    <Fragment>
          <div className="Login_SignupContainer">
            <div className="Login_SignupBox">
              <div>
                <div className="Login_SignupToggle">
                  <p onClick={(e) => switchTabs(e, "login")}>ĐĂNG NHẬP</p>
                  <p onClick={(e) => switchTabs(e, "register")}>ĐĂNG KÝ</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                    <i className='fa-solid fa-envelope'></i>
                    <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className="loginPassword">
                    <i className='fa-solid fa-lock'></i>
                    <input type="password" placeholder="Mật khẩu" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <Link to="#">Quên mật khẩu ?</Link>
                <input type="submit" value="Đăng nhập" className="loginBtn" />
              </form>
              <form className="signupForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                <div className="signupName">
                    <i className='fa-solid fa-user'></i>
                    <input type="text" placeholder="Tên đăng nhập" required name="username" value={username} onChange={registerDataChange} />
                </div>
                <div className="signupEmail">
                    <i className='fa-solid fa-envelope'></i>
                    <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
                </div>
                <div className="signupPassword">
                    <i className='fa-solid fa-lock'></i>
                    <input type="password" placeholder="Mật khẩu" required name="password" value={password} onChange={registerDataChange} />
                </div>
                
                <input type="submit" value="Đăng ký" className="signupBtn" />
              </form>
            </div>
          </div>
        </Fragment>
  );
};


export default LoginSignup;
