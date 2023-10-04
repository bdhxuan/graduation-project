import React, {Fragment, useEffect} from 'react';
import "./ListProduct.css"
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {getAdminProduct, clearErrors, deleteProduct} from "../../Actions/productAction";
import { Link} from "react-router-dom";
import { Button } from "@material-ui/core";
import {DELETE_PRODUCT_RESET} from "../../Constants/productConstant";
import { useNavigate } from 'react-router-dom';



const ListProduct = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.delete_update);

    const deleteProductHandle = (id) => {
      dispatch(deleteProduct(id));
    };

    useEffect(() => {
      if (error) {
        window.alert(error);
        dispatch(clearErrors());
      }

      if (deleteError) {
        window.alert(deleteError);
        dispatch(clearErrors());
      }

      if (isDeleted) {
        window.alert("Xóa sản phẩm thành công");
        navigate("/admin/products");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }

      dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

    const columns = [
        // { field: "id", headerName: "Mã sản phẩm", minWidth: 200, flex: 0.5 },

        { field: "name", headerName: "Tên", minWidth: 350, flex: 0.5},

        { field: "category", headerName: "Danh mục sản phẩm", minWidth: 150, flex: 0.5},

        { field: "stock", headerName: "Số lượng", type: "number", minWidth: 150, flex: 0},

        { field: "price", headerName: "Giá", type: "number", minWidth: 100, flex: 0.5},

        { field: "actions", flex: 0.2, headerName: "Actions", minWidth: 200, type: "number", sortable: false, renderCell: (params) => {
            return (
            <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <i className='fa-regular fa-pen-to-square'></i>
                </Link>

                <Button  onClick={() => deleteProductHandle(params.getValue(params.id, "id")) } > 
                  <i className='fa-solid fa-trash'></i>
                </Button>
            </Fragment>
            );
        },
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
        category: item.category,
      });
    });



  return (
    <Fragment>
      <Title title="Tất cả sản phẩm" />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">TẤT CẢ SẢN PHẨM</h1>

          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
      </div>
    </Fragment>
  )
}

export default ListProduct
