import React, {Fragment, useEffect, useState} from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../Actions/productAction";
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from "../../Constants/productConstant";
import { useNavigate } from 'react-router-dom';
import {getCategories} from "../../Actions/categoryAction"



const NewProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const { categories } = useSelector((state) => state.categories);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    useEffect(() => {
      dispatch(getCategories())
    },[dispatch])

    useEffect(() => {
        if (error) {
          window.alert(error);
          dispatch(clearErrors());
        }

        if (success) {
          window.alert("Thêm sản phẩm thành công");
          navigate("/admin/products");
          dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate]);




    const createProductSubmitHandle = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        
        images.forEach((image) => {
          myForm.append("images", image); //append di chu yen hinh anh vao trong form va dc sap xep o vi tri sau cung
        });
      dispatch(createProduct(myForm));
    };


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
          const reader = new FileReader();

          reader.onload = () => {
              if (reader.readyState === 2) {  //reader.readSate ===2 tuc la trang thai doc cua FileReader là Done - hoat dong doc hoan tat
                setImagesPreview((old) => [...old, reader.result]);
                setImages((old) => [...old, reader.result]);
              }
          };

          reader.readAsDataURL(file);
        });
    };

  return (
    <Fragment>
      <Title title="Thêm sản phẩm mới" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <div className='newProductBox'>
          <h1>Thêm sản phẩm</h1>
          <form className="createProductForm" encType="multipart/form-data" onSubmit={createProductSubmitHandle}>
            <div>
              <input className='textbox1' type="text" placeholder="Tên sản phẩm" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input className='textbox2' type="number" placeholder="Giá" required onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div>
              <textarea className='textbox2' placeholder="Mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1"></textarea>
            </div>

            <div>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value={""}>Chọn danh mục sản phẩm</option>
                {categories && categories.map(c => (
									<option key={c.category}>
										{c.category}
									</option>))}
              </select>
            </div>

            <div>
              <input className='textbox2' type="number" placeholder="Số lượng" required onChange={(e) => setStock(e.target.value)}/>
            </div>

            <div id="createProductFormFile">
              <input className='textbox1' type="file" name="avatar" accept="image/*" onChange={createProductImagesChange} multiple />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <input className="shippingBtn" type="submit" value="Thêm mới" disabled={loading ? true : false} />
          </form> 
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default NewProduct
