import { AuthContext } from "../contextProvider/AuthContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
function AdminPrivateRouters({ children }) {
  const { authState } = useContext(AuthContext);
  // if (!authState.isAdminAuth) {
  //   return <Navigate to="/Admin"></Navigate>;
  // }

  return children;
}
export default AdminPrivateRouters;
