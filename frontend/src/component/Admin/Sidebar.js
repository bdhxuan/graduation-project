import React from "react";
import "./Sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <i className="fa-solid fa-house"></i> Quản trị
        </p>
      </Link>
      <Link>
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
          <TreeItem nodeId="1" label="Sản phẩm">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="Tất cả sản phẩm" icon={<PostAddIcon />}  />
            </Link>

            <Link to="/admin/product/new">
              <TreeItem nodeId="3" label="Tạo sản phẩm mới" icon={<AddIcon />} />
            </Link>

            <Link to="/admin/categories">
              <TreeItem nodeId="2" label="Tất cả danh mục" icon={<PostAddIcon />}  />
            </Link>

            <Link to="/admin/category/new">
              <TreeItem nodeId="3" label="Tạo danh mục mới" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <i className="fa-solid fa-clipboard-list"></i> Đơn hàng
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <i className="fa-solid fa-users"></i> Người dùng
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
        <i class="fa-solid fa-star"></i>Đánh giá
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;