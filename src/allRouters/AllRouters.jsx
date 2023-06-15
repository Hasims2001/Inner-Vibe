import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Treatment from "../components/Treatment";
import SingleTreatment from "../components/SingleTreatment";
import SignIn from "../components/SignIn";
import Profile from "../components/Profile";
function AllRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Treatment" element={<Treatment />} />
      <Route path="/SingleTreatment/:tId" element={<SingleTreatment />} />
    </Routes>
  );
}
export default AllRouters;
