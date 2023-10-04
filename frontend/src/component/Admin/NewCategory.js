import React, {Fragment, useState, useEffect} from 'react'
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {createCategory, clearErrors} from "../../Actions/categoryAction";
import {NEW_CATEGORY_RESET} from "../../Constants/categoryConstant";
import "./NewCategory.css";


const NewCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newCategory);

    const [category, setCategory] = useState("");


    const createCategorySubmitHandle = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("category", category);

        dispatch(createCategory(myForm));
    }

    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }
        if (success) {
            window.alert("Thêm danh mục sản phẩm thành công");
            navigate("/admin/categories");
            dispatch({ type: NEW_CATEGORY_RESET });
        }
    }, [dispatch, error, success, navigate]);

  return (
    <Fragment>
      <Title title="Thêm sản phẩm mới" />
      <div className="dashboard">
        <Sidebar />
        <div className="newCategoryContainer">
            <div className='newCategoryBox'>
            <h1>Thêm danh mục sản phẩm</h1>
              <form className="createCategoryForm" encType="multipart/form-data" onSubmit={createCategorySubmitHandle}>
              <div>
                <input className='textbox1' type="text" placeholder="Tên danh mục sản phẩm" required value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <input className="shippingBtn" value="Thêm mới" type="submit" disabled={loading ? true : false}/>
            </form>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NewCategory;
