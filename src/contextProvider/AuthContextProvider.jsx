import { createContext } from "react";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const obj = {
    authState: {
      isAuth: false,
      isAdminAuth: false,
      id: 0,
      name: "",
      email: "",
    },
    loginAdmin: () => {
      obj.authState.isAdminAuth = true;
    },
    logoutAdmin: () => {
      obj.authState.isAdminAuth = false;
    },

    loginUser: (data) => {
      obj.authState.id = data.id;
      obj.authState.name = data.name;
      obj.authState.email = data.email;
      obj.authState.isAuth = true;
      console.log(obj.authState);
    },
    logoutUser: () => {
      obj.authState.id = 0;
      obj.authState.name = "";
      obj.authState.email = "";
      obj.authState.isAuth = false;
    },
  };
  return (
    <AuthContext.Provider value={obj}>{props.children}</AuthContext.Provider>
  );
}
export default AuthContextProvider;
