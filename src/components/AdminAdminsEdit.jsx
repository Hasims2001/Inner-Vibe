import { Box, Heading, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useReducer, useEffect, useState } from "react";
import { reducer } from "../utills/reducer";
import {
  adminSingleProduct,
  adminPatchProduct,
  adminPostProduct,
} from "../utills/api";
import { delete_btn, edit_btn_type } from "./Animated";
import Loading from "./Loading";
import Error from "./Error";
import "../styling/AdminDashboard.css";
function AdminAdminsEdit() {
  const { productId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
    productsData: {
      id: "",
      name: "",
      email: "",
      password: "",
    },
  });
  const toast = useToast();
  const { productsData, loading, error } = state;
  let { id, name, email, password } = productsData;
  const [check, setCheck] = useState(false);
  const val2 = "Cancel";
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      dispatch({ type: "LOADING" });
      const fetchingProduct = async () => {
        try {
          let res = await adminSingleProduct("admins", productId);
          res = await res?.data;
          dispatch({ type: "PRODUCTDATA", payload: res });
        } catch (error) {
          dispatch({ type: "ERROR" });
        }
      };
      fetchingProduct();
      dispatch({ type: "LOADING_COMPLETED" });
    } else {
      setCheck(true);
    }
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const handlEdit = (e) => {
    e.preventDefault();
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    dispatch({ type: "LOADING" });
    if (!check) {
      const postingProduct = async () => {
        try {
          let res = await adminPatchProduct("admins", {
            id,
            name,
            email,
            password,
          });
          res = await res?.data;
          if (res) {
            toast({
              title: `Edited`,
              status: "success",
              isClosable: true,
            });
            navigate("/AdminAdmins");
          }
        } catch (error) {
          dispatch({ type: "ERROR" });
        }
      };
      postingProduct();
    } else {
      const postingNewProduct = async () => {
        try {
          let res = await adminPostProduct("admins", {
            name,
            email,
            password,
          });
          res = await res?.data;
          if (res) {
            toast({
              title: `Added`,
              status: "success",
              isClosable: true,
            });
            navigate("/AdminAdmins");
          }
        } catch (error) {
          dispatch({ type: "ERROR" });
        }
      };
      postingNewProduct();
    }
    dispatch({ type: "LOADING_COMPLETED" });
  };
  const handleDelete = () => {
    navigate("/AdminAdmins");
  };
  return (
    <Box pb={"50px"}>
      <AdminHeader />
      <Box m={"20px 190px"}>
        <Heading as={"h3"} fontWeight={"normal"}>
          {check ? "Add New Admin" : "Edit Admin"}
        </Heading>
        <form onSubmit={handlEdit}>
          <table width={"100%"} className="edittable">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="number"
                    id="id"
                    placeholder="Automatically Add"
                    disabled
                    value={id}
                  />
                </td>
              </tr>
              <tr>
                <td>Name: </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      dispatch({
                        type: "PRODUCT_VALUE",
                        payload: { name: e.target.name, value: e.target.value },
                      });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => {
                      dispatch({
                        type: "PRODUCT_VALUE",
                        payload: { name: e.target.name, value: e.target.value },
                      });
                    }}
                    value={email}
                  />
                </td>
              </tr>
              <tr>
                <td>Password: </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      dispatch({
                        type: "PRODUCT_VALUE",
                        payload: { name: e.target.name, value: e.target.value },
                      });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th className="delete_button" style={{ float: "right" }}>
                  {delete_btn({ handleDelete, val2 })}
                </th>
                <th className="edit_button">
                  {edit_btn_type({ type: "submit" })}
                </th>
              </tr>
            </tbody>
          </table>
        </form>
      </Box>
    </Box>
  );
}
export default AdminAdminsEdit;
