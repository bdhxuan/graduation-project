import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from '@material-ui/icons/Home';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {logout} from "../../../Actions/userAction"


const UserOptions = ({ user }) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [];

  if (user.role === "admin") {
    options.unshift(
      { icon: <DashboardIcon />, name: "Admin",func: dashboard,},
      { icon: <PersonIcon />, name: "Tài khoản", func: account },
      { icon: <ExitToAppIcon />, name: "Đăng xuất", func: logoutUser },
    );
  }

  if (user.role === "thành viên") {
    options.unshift(
      { icon: <ListAltIcon />, name: "Đơn hàng của tôi", func: orders },
      { icon: <PersonIcon />, name: "Tài khoản", func: account },
      { icon: <HomeIcon />, name: "Trang chủ", func: home },
      { icon: <ExitToAppIcon />, name: "Đăng xuất", func: logoutUser },
    );
  }

  function home() {
    navigate("/");
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  
  function logoutUser() {
    dispatch(logout());
    window.alert("Bạn muốn đăng xuất?")
    navigate("/")
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={<img className="speedDialIcon" src={user.avatar.url} alt="Profile" />}>
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;