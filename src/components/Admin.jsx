import {
  Flex,
  Box,
  HStack,
  Image,
  Text,
  Stack,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Input,
} from "@chakra-ui/react";
import login from "../img/login.png";
import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reducer } from "../utills/reducer";
import { AuthContext } from "../contextProvider/AuthContextProvider";
import { fetchAdmin } from "../utills/api";
function Admin() {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { loginAdmin } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const posting = async () => {
      try {
        let res = await fetchAdmin();
        res = await res?.data;
        console.log(res);
        if (res) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].email === email && res[i].password === password) {
              loginAdmin();
              navigate("/AdminDashboard");
            }
          }
          setFlag(true);
          setTimeout(() => {
            setFlag(false);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    posting();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        boxShadow={
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        }
        borderRadius="20px"
        bg={"brand.700"}
        m={"0 30%"}
        padding={"20px"}
      >
        <HStack alignItems={"flex-start"}>
          <Image src={login} w={"50%"} alt="login" />
          <VStack alignItems={"flex-start"} mt={"10px"}>
            <Heading as={"h2"}>Admin Login</Heading>

            <form onSubmit={handleSubmit}>
              <FormControl isRequired mt={"10px"}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email..."
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <br />
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password..."
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <Input
                  cursor={"pointer"}
                  type="submit"
                  value={"Login"}
                  w={"fit-content"}
                />
              </FormControl>
            </form>
          </VStack>
        </HStack>
        {flag && (
          <Alert
            borderRadius={"20px"}
            m={"30px 0"}
            status="error"
            color={"brand.100"}
          >
            <AlertIcon />
            Invalid Email or Password...
          </Alert>
        )}
      </Box>
    </div>
  );
}
export default Admin;
