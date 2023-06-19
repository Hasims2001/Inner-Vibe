import { Box, Stack, Heading, Image, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import "../styling/AdminDashboard.css";
import { useEffect, useReducer, useState } from "react";
import { reducer } from "../utills/reducer";
import {
  adminSalesData,
  adminBlogData,
  adminProductData,
  adminUserData,
  adminContact,
  adminAdminData,
} from "../utills/api";
function AdminDashboard() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,

    salesData: [],
    blogData: [],
    productsData: [],
    userData: [],
    contact: {},
    adminData: [],
  });
  const { salesData, blogData, productsData, userData, contact, adminData } =
    state;
  const [today, setToday] = useState(0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);
  useEffect(() => {
    dispatch({ type: "LOADING" });

    const fetchingSales = async () => {
      try {
        let res = await adminSalesData();
        res = await res?.data;
        dispatch({ type: "SALESDATA", payload: res });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };

    // const fetchingBlogs = async () => {
    //   try {
    //     let res = await adminBlogData();
    //     res = await res?.data;
    //     dispatch({ type: "BLOGDATA", payload: res });
    //   } catch (error) {
    //     dispatch({ type: "ERROR" });
    //   }
    // };
    // const fetchingProducts = async () => {
    //   try {
    //     let res = await adminProductData();
    //     res = await res?.data;
    //     dispatch({ type: "PRODUCTDATA", payload: res });
    //   } catch (error) {
    //     dispatch({ type: "ERROR" });
    //   }
    // };
    // const fetchingUsers = async () => {
    //   try {
    //     let res = await adminUserData();
    //     res = await res?.data;
    //     dispatch({ type: "USERDATA", payload: res });
    //   } catch (error) {
    //     dispatch({ type: "ERROR" });
    //   }
    // };
    // const fetchingContact = async () => {
    //   try {
    //     let res = await adminContact();
    //     res = await res?.data;
    //     dispatch({ type: "CONTACT", payload: res });
    //   } catch (error) {
    //     dispatch({ type: "ERROR" });
    //   }
    // };
    // const fetchingAdmin = async () => {
    //   try {
    //     let res = await adminAdminData();
    //     res = await res?.data;
    //     dispatch({ type: "ADMINDATA", payload: res });
    //   } catch (error) {
    //     dispatch({ type: "ERROR" });
    //   }
    // };
    fetchingSales();
    // fetchingBlogs();
    // fetchingProducts();
    // fetchingUsers();
    // fetchingContact();
    // fetchingAdmin();

    let sumToday = 0;
    let sumWeek = 0;
    let sumMonth = 0;
    let today = new Date();
    today = today.toISOString().split("T")[0];

    const now = new Date();
    let week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    week = week.toISOString().split("T")[0];
    week = week.split("-");
    week[2] = Math.abs(week[2] - 8);
    week = week.join("-");

    const temp = new Date();
    let month = new Date(
      temp.getFullYear(),
      temp.getMonth(),
      temp.getDate() - 30
    );
    month = month.toISOString().split("T")[0];

    for (let i = 0; i < salesData.length; i++) {
      if (salesData[i].appoinment === today) {
        sumToday += salesData[i].totalAmout;
      }
      if (salesData[i].appoinment >= week) {
        sumWeek += salesData[i].totalAmout;
      }
      if (salesData[i].appoinment >= month) {
        sumMonth += salesData[i].totalAmout;
      }
    }
    setToday(sumToday);
    setWeek(sumWeek);
    setMonth(sumMonth);
    dispatch({ type: "LOADING_COMPLETED" });
  }, [today, week, month]);

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
              $ {today}.00
            </Text>
          </Box>
          <Box bg={"brand.200"} borderRadius={"20px"} padding={"40px 60px"}>
            <Text m={"10px 0"} fontSize={"3xl"}>
              Week Sales
            </Text>
            <Text m={"10px 0"} fontSize={"2xl"}>
              {" "}
              $ {week}.00
            </Text>
          </Box>
          <Box bg={"brand.200"} borderRadius={"20px"} padding={"40px 60px"}>
            <Text m={"10px 0"} fontSize={"3xl"}>
              Month Sales
            </Text>
            <Text m={"10px 0"} fontSize={"2xl"}>
              {" "}
              $ {month}.00
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
export default AdminDashboard;
