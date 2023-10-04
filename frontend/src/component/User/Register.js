import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import toast,{ Toaster } from 'react-hot-toast';
import { register} from '../../Actions/userAction';
import { useDispatch, useSelector} from 'react-redux';
import './Login.css';

const Register = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {signupError, signupSuccess, isAuthenticated} = useSelector( (state) => state.user);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [avatar, setAvatar] = useState("user.png");
    const [avatarPreview, setAvatarPreview] = useState("user.png");

    const { username, email, password} = user;

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("username", username);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        } else {
        setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if(signupError !== "" && signupSuccess === "") {
            toast.error("Không thể đăng ký tài khoản")
        }
        if(isAuthenticated){
            toast.success("Đăng ký thành công")
            navigate(redirect);
        }
    }, [dispatch, signupError, signupSuccess, navigate, isAuthenticated, redirect]);

    return (
        <Fragment>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="login container mx-auto">
                <div className='flex justify-center items-center h-screen'>
                    <div className="glass">
                        <div className="title flex flex-col items-center">
                            <h1 className='text-5xl font-bold'>Đăng ký</h1>
                        </div>
                        <form className='py-1 form' encType="multipart/form-data" onSubmit={registerSubmit}>
                            <div className='profile flex justify-center py-4'>
                                <img src={avatarPreview} alt="Avatar Preview" className="profile_img"/>
                                <input className='textbox4'  type="file" name="avatar" accept="image/*" onChange={registerDataChange}/>
                            </div>
                            <div className="textbox flex flex-col items-center gap-6">
                                <input className="textbox1" type="text" placeholder='Tên đăng nhập' required name='username' value={username} onChange={registerDataChange}/>
                                <input className="textbox2" type="text" placeholder='Email' required name='email' value={email} onChange={registerDataChange}/>
                                <input className="textbox3" type="text" placeholder='Mật Khẩu' required name='password' value={password} onChange={registerDataChange}/>
                                <button className="btn_login" type='submit'>Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;