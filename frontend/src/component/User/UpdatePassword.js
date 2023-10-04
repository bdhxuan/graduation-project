import React, {Fragment, useState, useEffect} from 'react'
import Title from '../layout/Title';
import "./UpdateProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, loadUser ,clearErrors} from '../../Actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstant";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isUpdated} = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      window.alert("Đổi mật khẩu thành công");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <Fragment>
          <Title title="Đổi mật khẩu" />
          <div className="updateProfileContainer">
            <div className="updatePassBox">
              <div className="title flex flex-col items-center">
                <h1 className='text-5xl font-bold'>Đổi mật khẩu</h1>
              </div>

              <form className="py-1 form" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <br/>
                <div>
                 <i className='fa-solid fa-key'></i>
                  <input className='update_textbox2' type="password" placeholder="Mật khẩu hiện tại" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <br />
                <div>
                  <i className='fa-solid fa-unlock'></i>
                  <input className='update_textbox2' type="password" placeholder="Mật khẩu mới" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <br />
                <div>
                 <i className='fa-solid fa-lock'></i>
                  <input className='update_textbox2' type="password" placeholder="Xác nhận mật khẩu mới" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <input type="submit" value="CẬP NHẬT" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
  )
}

export default UpdatePassword;
