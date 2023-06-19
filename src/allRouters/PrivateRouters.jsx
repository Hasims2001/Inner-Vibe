import { AuthContext } from "../contextProvider/AuthContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
function PrivateRouters({ children }) {
  const { authState } = useContext(AuthContext);
  if (!authState.isAuth) {
    return <Navigate to="/Signin"></Navigate>;
  }

  return children;
}
export default PrivateRouters;
