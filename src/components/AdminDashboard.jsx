import { Box, Stack, Heading, Image, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import "../styling/AdminDashboard.css";
import { useEffect, useReducer } from "react";
import { reducer } from "../utills/reducer";
import { wholeData } from "../utills/api";
function AdminDashboard() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
    data: [],
    userData: [],
    salesData: [],
    AdminData: [],
    blogData: [],
    productsData: [],
    contact: {},
  });

  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetching = async () => {
      try {
        let res = await wholeData();
        console.log(res);
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };
    fetching();
  }, []);
  return (
    <Box>
      <AdminHeader />
      <Box style={{ margin: "20px 190px" }}>
        <HStack justifyContent={"space-between"}>
          <Box bg={"brand.200"} borderRadius={"20px"} padding={"40px 60px"}>
            <Text m={"10px 0"} fontSize={"3xl"}>
              Today Sales
            </Text>
            <Text m={"10px 0"} fontSize={"2xl"}>
              {" "}
              $ 150.00
            </Text>
          </Box>
          <Box bg={"brand.200"} borderRadius={"20px"} padding={"40px 60px"}>
            <Text m={"10px 0"} fontSize={"3xl"}>
              Week Sales
            </Text>
            <Text m={"10px 0"} fontSize={"2xl"}>
              {" "}
              $ 180.00
            </Text>
          </Box>
          <Box bg={"brand.200"} borderRadius={"20px"} padding={"40px 60px"}>
            <Text m={"10px 0"} fontSize={"3xl"}>
              Month Sales
            </Text>
            <Text m={"10px 0"} fontSize={"2xl"}>
              {" "}
              $ 18 0.00
            </Text>
          </Box>
        </HStack>

        <Box>
          <table className="styled-table responsive">
            <thead>
              <tr>
                <th>Id</th>
                <th>Package Name</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="package_tbody">
              <tr>
                <td>Id</td>
                <td>Package Name</td>
                <td>Destination</td>
                <td>Duration</td>
                <td>Price</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}
export default AdminDashboard;
