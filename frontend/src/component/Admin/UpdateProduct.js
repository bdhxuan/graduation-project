import React, {Fragment, useEffect, useState} from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails} from "../../Actions/productAction";
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import {UPDATE_PRODUCT_RESET} from "../../Constants/productConstant";
import {useParams} from "react-router-dom";
import {getCategories} from "../../Actions/categoryAction"



const UpdateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const { error, product } = useSelector((state) => state.productDetails);

    const { loading, error: updateError, isUpdated} = useSelector((state) => state.delete_update);

    const { categories } = useSelector(state => state.categories);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  

    const productId = id;

   const updateProductSubmitHandle = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      window.alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      window.alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    
    dispatch(getCategories())
  }, [dispatch,error,navigate,isUpdated,productId,product,updateError]);


  return (
    <Fragment>
      <Title title="Cập nhật sản phẩm" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <div className='newProductBox'>
            <h1>Chỉnh sửa sản phẩm</h1>
            <form className="createProductForm" encType="multipart/form-data" onSubmit={updateProductSubmitHandle}>
            <div>
              <input className='textbox1' type="text" placeholder="Tên sản phẩm" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <input className='textbox2' type="number" placeholder="Giá" required onChange={(e) => setPrice(e.target.value)} value={price} />
            </div>
            <div>
              <textarea className='textbox2' placeholder="Mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1"></textarea>
            </div>

            <div >
              <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option>Chọn danh mục sản phẩm</option>
                {categories && categories.map(c => (
									<option key={c.category} >
										{c.category}
									</option>))}
              </select>
            </div>

            <div>
              <input className='textbox2' type="number" placeholder="Số lượng" required onChange={(e) => setStock(e.target.value)} value={stock}/>
            </div>

            <div id="createProductFormFile">
              <input className='textbox1' type="file" name="avatar" accept="image/*" onChange={updateProductImagesChange} multiple />
            </div>

            <div id="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={`/uploads/${images}`} alt="Product Preview" />
              ))}
            </div>
            <input className="shippingBtn" value="Cập nhật" type="submit" disabled={loading ? true : false}/>
          </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct
