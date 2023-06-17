import { Routes, Route } from "react-router-dom";
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
    </Routes>
  );
}
export default AllRouters;
