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
function AdminProductsEdit() {
  const { productId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
    productsData: {
      id: "",
      name: "",
      lightIcon: "",
      price: "",
      iconColor: "",
      description: "",
      darkIcon: "",
    },
  });
  const toast = useToast();
  const { productsData, loading, error } = state;
  let { id, name, lightIcon, price, iconColor, description, darkIcon } =
    productsData;
  const [check, setCheck] = useState(false);
  const val2 = "Cancel";
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      dispatch({ type: "LOADING" });
      const fetchingProduct = async () => {
        try {
          let res = await adminSingleProduct("products", productId);
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
    let price = document.getElementById("price").value;
    price = Number(price);
    let lightIcon = document.getElementById("iconCode").value;
    dispatch({ type: "LOADING" });
    if (!check) {
      const postingProduct = async () => {
        try {
          let res = await adminPatchProduct("products", {
            id,
            name,
            lightIcon,
            price,
            iconColor,
          });
          res = await res?.data;
          if (res) {
            toast({
              title: `Edited`,
              status: "success",
              isClosable: true,
            });
            navigate("/AdminProducts");
          }
        } catch (error) {
          dispatch({ type: "ERROR" });
        }
      };
      postingProduct();
    } else {
      const postingNewProduct = async () => {
        try {
          let res = await adminPostProduct("products", {
            name,
            lightIcon,
            price,
            iconColor,
            description,
            darkIcon,
          });
          res = await res?.data;
          if (res) {
            toast({
              title: `Added`,
              status: "success",
              isClosable: true,
            });
            navigate("/AdminProducts");
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
    navigate("/AdminProducts");
  };
  return (
    <Box pb={"50px"}>
      <AdminHeader />
      <Box m={"20px 190px"}>
        <Heading as={"h3"} fontWeight={"normal"}>
          {check ? "Add New Product" : "Edit Product"}
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
                <td>Icon Code: </td>
                <td>
                  <input
                    type="text"
                    id="iconCode"
                    name="lightIcon"
                    onChange={(e) => {
                      dispatch({
                        type: "PRODUCT_VALUE",
                        payload: { name: e.target.name, value: e.target.value },
                      });
                    }}
                    value={lightIcon}
                  />
                </td>
              </tr>
              <tr>
                <td>Icon Color: </td>
                <td>
                  <input
                    type="text"
                    id="iconColor"
                    name="iconColor"
                    value={iconColor}
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
                <td>Price: </td>
                <td>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => {
                      dispatch({
                        type: "PRODUCT_VALUE",
                        payload: {
                          name: e.target.name,
                          value: Number(e.target.value),
                        },
                      });
                    }}
                  />
                </td>
              </tr>
              {/* <tr>
              <td>Description: </td>
              <td>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  value={}
                ></textarea>
              </td>
            </tr> */}
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
export default AdminProductsEdit;
