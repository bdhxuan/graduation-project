/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import "../Header/Header.css"
import {NavLink} from "react-router-dom";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";


const Header = ({history}) => {
  const [showIcons, setShowIcons] = useState(false);

  const [keyword, setKeyword] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const searchSubmit = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      history.push(`/products/${keyword}`);
    }
    else {
      history.push("/products");
    }
  };

  const clearKeyword = () => {
    setKeyword('');
  }

  
    return (
      <Fragment>
        <nav className="main-nav">
        <div className="logo">
          <NavLink to="/"><h1>X-Bike <i className="fa-solid fa-bicycle"></i></h1></NavLink>
        </div>
        <div className= { showIcons ? "menu-link mobile-menu-link": "menu-link" }>
          <ul>
            <li>
              <NavLink to="/">Trang Chủ</NavLink>
            </li>
            <li>
              <NavLink to="/products">Sản Phẩm</NavLink>
            </li>
          </ul>
        </div>
        
        <div className="icon">
          {/* <form className="searchBox" onSubmit={searchSubmit}>
            <input type="search" placeholder="Tìm kiếm..."  onChange={(e) => setKeyword(e.target.value)} />
            <NavLink to={`/products/${keyword}`}>
              <span type="submit">
                <i className="fas fa-search"></i>
              </span>
            </NavLink>
          </form> */}
          <div className="formDiv col-md-5 mx-auto border mt-3 d-flex align-items-center justify-content-between">
          
            <NavLink to={`/products/${keyword}`}>
              <button type="button" className="btn mx-1">
              <i className="fa fa-search mx-1"></i>
              </button>
            </NavLink>
            <form style={{width: '100%'}} className="ml-2 mb-3" onSubmit={searchSubmit}>
              <div className="form-group mt-3" >
                <input type="text" className="form-control border-0" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
            </form>
            {keyword ? (<i className="fa-solid fa-xmark mx-1" onClick={() => clearKeyword()}></i>) : ('')}
            
            {/* <form className="searchBox" onSubmit={searchSubmit}>
              <input type="search" placeholder="Tìm kiếm..."  onChange={(e) => setKeyword(e.target.value)} />
              <NavLink to={`/products/${keyword}`}>
                <span type="submit">
                  <i className="fas fa-search"></i>
                </span>
              </NavLink>
          </form> */}
          </div>

          <div className="col-md-8 mx-auto mt-4 d-flex">
            <NavLink to="/cart"><i className="fa-solid fa-cart-plus"></i></NavLink>
          </div>

          <div className="col-md-5 mx-auto mt-4 d-flex">
            {isAuthenticated && <UserOptions user={user} />}
            <NavLink to="/login"><i className="fa-solid fa-user"></i></NavLink>
          </div>
            
            <div className="menu">
                <a href="#" onClick={() => setShowIcons(!showIcons)}><i className="fa-solid fa-bars"></i></a>
            </div>
        </div>
      </nav>
      </Fragment>
    )
};

export default Header;