import { AuthContext } from "../contextProvider/AuthContextProvider";
import { useContext } from "react";
import {
  Heading,
  Box,
  Container,
  Card,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { reducer } from "../utills/reducer";
import { useReducer } from "react";
function Profile() {
  const { authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: [],
    error: false,
  });
  //   if (!authState.isAuth) {
  //     return <Navigate to="/SignIn" />;
  //   }
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
          </Card>
        </Container>
      </VStack>
    </Box>
  );
}
export default Profile;
