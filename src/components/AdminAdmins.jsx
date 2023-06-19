import {
  Box,
  Stack,
  Heading,
  Image,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useReducer, useEffect, useState } from "react";
import { reducer } from "../utills/reducer";
import { adminAdminData, deleteData } from "../utills/api";
import { delete_btn, edit_btn } from "./Animated";
import Loading from "./Loading";
import Error from "./Error";
function AdminAdmins() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
    productsData: [],
  });
  const { productsData, loading, error } = state;
  const [sorting, setSorting] = useState("");
  const [staus, setStatus] = useState(false);
  const toast = useToast();
  const [searching, setSearching] = useState("");
  const val = "Edit";
  const val2 = "Delete";
  let navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "LOADING" });

    const fetchingProduct = async () => {
      try {
        let res = await adminAdminData(searching, sorting);
        res = await res?.data;
        console.log(res);
        dispatch({ type: "PRODUCTDATA", payload: res });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };

    fetchingProduct();

    dispatch({ type: "LOADING_COMPLETED" });
  }, [searching, sorting, staus]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const handlEdit = (e) => {
    navigate(`/AdminAdmins/${e}`);
  };
  const handleNew = () => {
    navigate("/AdminAdmins/AddNew");
  };
  const handleDelete = (e) => {
    toast({
      title: `ID ${e} Deleting... `,
      status: "info",
      isClosable: true,
    });
    const trytodelete = async () => {
      try {
        let res = await deleteData("admins", e);
        setStatus(!staus);
        toast({
          title: `Deleted`,
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };
    trytodelete();
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
              <option value="">Sort By Name</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </div>
        </HStack>
        <table className="styled-table responsive">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="package_tbody">
            {productsData.map(({ id, name, email }) => (
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
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
export default AdminAdmins;
