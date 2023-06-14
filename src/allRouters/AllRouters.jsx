import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Treatment from "../components/Treatment";
function AllRouters() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Treatment" element={<Treatment />} />
    </Routes>
  );
}
export default AllRouters;
