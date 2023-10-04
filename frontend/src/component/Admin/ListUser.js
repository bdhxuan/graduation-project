import React, {Fragment, useEffect} from 'react';
import "./ListProduct.css"
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, clearErrors, deleteUser } from "../../Actions/userAction";
import { Link} from "react-router-dom";
import { Button } from "@material-ui/core";
import { DELETE_USER_RESET } from "../../Constants/userConstant";
import { useNavigate } from 'react-router-dom';

const ListUser = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message} = useSelector((state) => state.profile);

    const deleteUserHandle = (id) => {
        dispatch(deleteUser(id));
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
        window.alert(message);
        navigate("/admin/users");
        dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, navigate, isDeleted, message]);

    const columns = [
        // { field: "id", headerName: "Mã người dùng", minWidth: 180, flex: 0.8 },

        { field: "email", headerName: "Email", minWidth: 200, flex: 1},

        { field: "name", headerName: "Tên", minWidth: 150, flex: 0.5},

        // { field: "password", headerName: "Mật khẩu", minWidth: 150, flex: 0.5},

        { field: "role", headerName: "Vai trò", type: "number", minWidth: 150, flex: 0.5, cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";},
        },

        { field: "actions", flex: 0.5, headerName: "Actions", minWidth: 150, type: "number", sortable: false, renderCell: (params) => {
            return (
            <Fragment>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                    <i className='fa-regular fa-pen-to-square'></i>
                </Link>

                <Button onClick={() => deleteUserHandle(params.getValue(params.id, "id"))}>
                    <i className='fa-solid fa-trash'></i>
                </Button>
            </Fragment>
            );
            },
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.username,
        password: item.password,
      });
    });

  return (
    <Fragment>
      <Title title={"Tất cả người dùng"} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">Tất cả người dùng</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ListUser
