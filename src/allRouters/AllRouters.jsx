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

      <Route path="/Profile" element={<Profile />} />
      <Route path="/Blog" element={<BlogList />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Treatment" element={<Treatment />} />
      <Route path="/SingleTreatment/:tId" element={<SingleTreatment />} />
    </Routes>
  );
}
export default AllRouters;
