import { AuthContext } from "../contextProvider/AuthContextProvider";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import {
  Heading,
  Box,
  Container,
  Card,
  HStack,
  Image,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { reducer } from "../utills/reducer";
import { useReducer } from "react";
import { fetchSalesData } from "../utills/api";
function Profile() {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
    error: false,
  });
  const { loading, data, error } = state;

  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetching = async () => {
      try {
        let res = await fetchSalesData(authState.id);
        res = await res?.data;
        dispatch({ type: "FATCHED", payload: res });
      } catch (error) {
        dispatch({ type: "ERROR" });
        console.log(error);
      }
    };
    fetching();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Box m={"30px"}>
      <Heading>Profile</Heading>
      <VStack>
        <Container m={"30px auto"}>
          <Card p={"30px"} bg={"brand.200"}>
            <HStack alignItems={"center"}>
              <Box
                bgGradient={"linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"}
                color={"brand.100"}
                p={"15px 4"}
                borderRadius={"100%"}
              >
                <Image
                  w={"80px"}
                  p={"15px"}
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                />
              </Box>
              <Box
                bg={"brand.600"}
                style={{
                  width: "100px",
                  height: "1px",
                  transform: "rotate(90deg)",
                }}
              />
              <Box>
                <Text fontSize={"xl"} as={"b"} color={"brand.600"}>
                  Name : {authState.name}
                </Text>
                <br />
                <Text fontSize={"lg"} color={"brand.600"}>
                  Email : {authState.email}
                </Text>
                <br />
                <Button
                  variant={"GradientPrimary"}
                  onClick={() => {
                    localStorage.setItem("flag", "false");
                    localStorage.removeItem("cartId");
                    navigate("/");
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            </HStack>
          </Card>
        </Container>
        <Container m={"30px auto"}>
          <Card p={"30px"} bg={"brand.200"} color={"brand.600"}>
            <Text fontSize={"lg"} m={"10px 0"}>
              Order History
            </Text>
            <hr />
            <VStack m={"20px 0"} alignItems={"flex-start"}>
              {data.map((item) => (
                <Box>
                  <Text>Appoinment : {item.appoinment}</Text>
                  <Text>Payment Mode : {item.payment}</Text>
                </Box>
              ))}
            </VStack>
          </Card>
        </Container>
      </VStack>
    </Box>
  );
}
export default Profile;
