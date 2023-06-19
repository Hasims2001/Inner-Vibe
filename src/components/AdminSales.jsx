import { Box, Stack, Heading, Image, HStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useReducer, useEffect, useState } from "react";
import { reducer } from "../utills/reducer";
import { adminSalesData } from "../utills/api";
import { delete_btn, edit_btn } from "./Animated";
import Loading from "./Loading";
import Error from "./Error";
function AdminProducts() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
    productsData: [],
  });
  const { productsData, loading, error } = state;
  const [sorting, setSorting] = useState("");
  const [searching, setSearching] = useState("");
  const val = "Edit";
  const val2 = "Delete";
  let navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "LOADING" });

    const fetchingProduct = async () => {
      try {
        let res = await adminSalesData(searching, sorting);
        res = await res?.data;
        console.log(res);
        dispatch({ type: "PRODUCTDATA", payload: res });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };

    fetchingProduct();

    dispatch({ type: "LOADING_COMPLETED" });
  }, [searching, sorting]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const handlEdit = (e) => {
    navigate(`/AdminSales/${e}`);
  };
  const handleNew = () => {
    navigate("/AdminSales/AddNew");
  };
  const handleDelete = (e) => {
    console.log(e);
  };
  return (
    <Box pb={"50px"}>
      <AdminHeader />

      <Box style={{ margin: "20px 190px" }}>
        <HStack class="optionsdata">
          <div id="newdata">
            <button class="cta" id="admin_add" onClick={(e) => handleNew()}>
              <span>Add New</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
          <div id="searchbar">
            <input
              class="input"
              id="search"
              name="text"
              placeholder="Search..."
              type="search"
              value={searching}
              onChange={(e) => setSearching(e.target.value)}
            />
          </div>
          {/* <div id="filteringdata">
            <select name="filtering" id="filtering">
              <option value="">Filter By</option>
              <option value="asc">Low To High</option>
              <option value="desc">High To Low</option>
            </select>
          </div> */}
          <div id="sortingdata">
            <select
              name="sorting"
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
              id="sorting"
            >
              <option value="">Sort By Appoinment</option>
              <option value="asc">Low To High</option>
              <option value="desc">High To Low</option>
            </select>
          </div>
        </HStack>
        <table className="styled-table responsive">
          <thead>
            <tr>
              <th>Id</th>
              <th>User-Id</th>
              <th>Appoinment</th>
              <th>Total Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="package_tbody">
            {productsData.map(({ id, userId, appoinment, totalAmout }) => (
              <tr>
                <td>{id}</td>
                <td>{userId}</td>
                <td>{appoinment}</td>
                <td>{totalAmout}</td>
                <td className="edit_button">
                  {edit_btn({ handlEdit, id, val })}
                </td>
                <td className="delete_button">
                  {delete_btn({ handleDelete, id, val2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
export default AdminProducts;
