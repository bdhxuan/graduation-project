import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Title from "../layout/Title";
import { Link, useNavigate} from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";
import { loadUser } from '../../Actions/userAction';

const Profile = () => {

    const { user, isAuthenticated , loading} = useSelector((state) => state.user);
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // const roleHandle = (e) => {
    //   e.preventDefault();
    //    if(user.role === "admin") {
    //     navigate("/admin/dashboard")
    //    }
    //    else if(user.role === "thành viên"){
    //        navigate("/")
    //    }
    // }
   

  useEffect(() => {
    // if (isAuthenticated === false) {
    //   navigate("/login");
    // }
    dispatch(loadUser);
  }, [dispatch]);
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <Title title={`${user.name}`} />
            <div className="profileContainer">
                <div>
                  <h1>TÀI KHOẢN CỦA TÔI</h1>
                  <img src={user.avatar.url} alt={user.name} />
                  <Link to="/me/update">CHỈNH SỬA TÀI KHOẢN</Link>
                </div>
                <div>
                  <div>
                      <h4>Họ Tên:</h4>
                      <p>{user.username}</p>
                  </div>
                  <br />
                  <div>
                      <h4>Email:</h4>
                      <p>{user.email}</p>
                  </div>
                  <br />
                  <div>
                      <h4>Vai trò:</h4>
                      <p>{user.role}</p>
                  </div>
                  <br />
                  <div className='update_pass'><Link to="/password/update">Đổi mật khẩu</Link></div>

                </div>
            </div>
        </Fragment>
     )}
    </Fragment>
  )
}

export default Profile;
