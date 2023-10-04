import React, { Fragment, useEffect, useState} from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,getAllReviews,deleteReviews} from "../../Actions/productAction.js";
import { Button } from "@material-ui/core";
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from "../../Constants/productConstant";
import { useNavigate} from 'react-router-dom';

const ProductReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    
    const { error, reviews, loading} = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewsHandle = (reviewId) => {
      dispatch(deleteReviews(reviewId));
    };
    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };
    

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
            }

        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            window.alert(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            window.alert("Xóa đánh giá thành công");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET  });
        }
        
  }, [dispatch, error, deleteError, navigate, isDeleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 100, flex: 0.5 },

        { field: "user", headerName: "Người dùng", minWidth: 350, flex: 0.5},

        { field: "comment", headerName: "Bình Luận", minWidth: 300, flex: 0.5},

        { field: "rating", headerName: "Đánh giá", type: "number", minWidth: 200, flex: 0, cellClassName: (params) => {
            return params.getValue(params.id, "rating") >= 3
              ? "greenColor"
              : "redColor";
        },},

        { field: "actions", flex: 0.2, headerName: "Actions", minWidth: 200, type: "number", sortable: false, renderCell: (params) => {
            return (
            <Fragment>
                <Button  onClick={() => deleteReviewsHandle(params.getValue(params.id, "id")) } > 
                  <i className='fa-solid fa-trash'></i>
                </Button>
            </Fragment>
            );
        },
        },
    ];

    const rows = [];

   reviews && reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.user,
      });
    });


  return (
    <Fragment>
      <Title title="Tất cả đánh giá" />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
        <form className="productReviewsForm" onSubmit={productReviewsSubmitHandler} >
            <h2>TẤT CẢ ĐÁNH GIÁ</h2>
            <div>
                <input type="text" placeholder="ID sản phẩm" required value={productId} onChange={(e) => setProductId(e.target.value)}/>
            </div>

            <Button id="createProductBtn" type="submit" disabled={
                loading ? true : false || productId === "" ? true : false
              }>
                Tìm kiếm
            </Button>
          </form>
            
            {reviews && reviews.length > 0 ? (
                <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
            ):(
                <h1 className="productReviewsFormHeading">Không có đánh giá</h1>
            )
            }
        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews;