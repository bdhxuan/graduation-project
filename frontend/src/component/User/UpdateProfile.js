import React, {Fragment, useState, useEffect} from 'react'
import Title from '../layout/Title';
import "./UpdateProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser ,clearErrors} from '../../Actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstant";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector( (state) => state.user);
    const { error, isUpdated} = useSelector((state) => state.profile);

    
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
      myForm.set("username", username);
      myForm.set("email", email);
      myForm.set("avatar", avatar)
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setuserName(user.username);
      setEmail(user.email);
    }
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      window.alert("Cập nhật tài khoản thành công");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  return (
    <Fragment>
          <Title title="Cập nhật tài khoản" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <div className="title flex flex-col items-center">
                <h1 className='text-5xl font-bold'>Cập nhật tài khoản</h1>
              </div>

              <form className="py-1 form" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className='profile flex justify-center py-3'>
                    <img src={avatarPreview} alt="Avatar Preview" className="update_profile_img"/>
                    <input className='textbox4'  type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange}/>
                </div>
                <div>
                  <i className='fa-solid fa-user'></i>
                  <input className='update_textbox1' type="text" placeholder="Tên" required name="name" value={username} onChange={(e) => setuserName(e.target.value)} />
                </div>
                <br/>
                <div>
                  <i className='fa-solid fa-envelope'></i>
                  <input className='update_textbox2' type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <input type="submit" value="CẬP NHẬT" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
  )
}

export default UpdateProfile;
