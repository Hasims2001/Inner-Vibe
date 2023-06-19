import { Routes, Router, Route } from "react-router-dom";
import Home from "../components/Home";
import Treatment from "../components/Treatment";
import SingleTreatment from "../components/SingleTreatment";
import SignIn from "../components/SignIn";
import Profile from "../components/Profile";
import BlogList from "../components/BlogList";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import PrivateRouters from "./PrivateRouters";
import BlogView from "../components/BlogView";
import AdminDashboard from "../components/AdminDashboard";
import Admin from "../components/Admin";
import AdminPrivateRouters from "./AdminPrivateRouters";
import AdminSales from "../components/AdminSales";
import AdminBlog from "../components/AdminBlog";
import AdminProducts from "../components/AdminProducts";
import AdminProductsEdit from "../components/AdminProductsEdit";
import AdminUsers from "../components/AdminUsers";
import AdminAdmins from "../components/AdminAdmins";
import AdminUsersEdit from "../components/AdminUsersEdit";
import AdminBlogsEdit from "../components/AdminBlogsEdit";
import AdminAdminsEdit from "../components/AdminAdminsEdit";
import AdminSalesEdit from "../components/AdminSalesEdit";
function AllRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/Cart"
        element={
          <PrivateRouters>
            <Cart />
          </PrivateRouters>
        }
      />
      <Route
        path="/Checkout"
        element={
          <PrivateRouters>
            <Checkout />
          </PrivateRouters>
        }
      />

      <Route
        path="/Profile"
        element={
          <PrivateRouters>
            <Profile />
          </PrivateRouters>
        }
      />
      <Route path="/Blog" element={<BlogList />} />
      <Route path="/Blog/:blogId" element={<BlogView />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Treatment" element={<Treatment />} />
      <Route path="/SingleTreatment/:tId" element={<SingleTreatment />} />

      <Route path="/Admin" element={<Admin />} />
      <Route
        path="/AdminDashboard"
        element={
          <AdminPrivateRouters>
            <AdminDashboard />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminSales"
        element={
          <AdminPrivateRouters>
            <AdminSales />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminSales/:productId"
        element={
          <AdminPrivateRouters>
            <AdminSalesEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminSales/AddNew"
        element={
          <AdminPrivateRouters>
            <AdminSalesEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminBlogs"
        element={
          <AdminPrivateRouters>
            <AdminBlog />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminBlogs/:productId"
        element={
          <AdminPrivateRouters>
            <AdminBlogsEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminBlogs/AddNew"
        element={
          <AdminPrivateRouters>
            <AdminBlogsEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminProducts"
        element={
          <AdminPrivateRouters>
            <AdminProducts />
          </AdminPrivateRouters>
        }
      />

      <Route
        path="/AdminProducts/:productId"
        element={
          <AdminPrivateRouters>
            <AdminProductsEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminProducts/AddNew"
        element={
          <AdminPrivateRouters>
            <AdminProductsEdit />
          </AdminPrivateRouters>
        }
      />

      <Route
        path="/AdminUsers"
        element={
          <AdminPrivateRouters>
            <AdminUsers />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminUsers/:productId"
        element={
          <AdminPrivateRouters>
            <AdminUsersEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminUsers/AddNew"
        element={
          <AdminPrivateRouters>
            <AdminUsersEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminAdmins"
        element={
          <AdminPrivateRouters>
            <AdminAdmins />
          </AdminPrivateRouters>
        }
      />

      <Route
        path="/AdminAdmins/:productId"
        element={
          <AdminPrivateRouters>
            <AdminAdminsEdit />
          </AdminPrivateRouters>
        }
      />
      <Route
        path="/AdminAdmins/AddNew"
        element={
          <AdminPrivateRouters>
            <AdminAdminsEdit />
          </AdminPrivateRouters>
        }
      />
    </Routes>
  );
}
export default AllRouters;
