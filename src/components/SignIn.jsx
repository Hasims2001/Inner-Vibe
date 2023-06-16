import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  HStack,
  Heading,
  Image,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useReducer, useContext, useState } from "react";
import Theme from "../contextProvider/Theme";
import { reducer } from "../utills/reducer.js";
import { getUserData, postUserData } from "../utills/api";
import { AuthContext } from "../contextProvider/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const init = {
  loading: false,
  data: {
    name: "",
    email: "",
    password: "",
  },
  error: false,
};
export default function SignIn() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);
  const { loading, data, error } = state;
  const { name, email, password } = data;
  const [value, setValue] = useState([]);

  const handleSignUp = (e) => {
    e.preventDefault();

    dispatch({ type: "LOADING" });
    postUserData(data)
      .then((res) => {
        loginUser({ name: data.name, email: data.email });
      })
      .catch((err) => dispatch({ type: "ERROR" }));
  };
  const getData = async () => {
    try {
      const res = await getUserData();
      let val = await res?.data;
      setValue(val);
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };
  const handleSignIn = (e) => {
    e.preventDefault();

    let flag = false;
    dispatch({ type: "LOADING" });
    getData();

    value.map(({ id, name, email, password }) => {
      if (email === data.email && password === data.password) {
        flag = true;
        loginUser({ id: id, name: name, email: email });
      }
    });
    dispatch({ type: "LOADING_COMPLETED" });
    if (!flag) {
      alert(`Invalid Credentials`);
      dispatch({ type: "RESET", payload: init });
    } else {
      navigate("/");
    }
  };
  const handleChange = (first, second) => {
    let vi = document.getElementById(first);
    let hi = document.getElementById(second);
    vi.style.display = "flex";
    hi.style.display = "none";
  };
  return (
    <Box m={"30px 0px 60px 0px"}>
      <HStack mb={"20px"}>
        <Box
          bg={"brand.200"}
          borderRadius={"lg"}
          cursor={"pointer"}
          onClick={() => handleChange("signup", "signin")}
        >
          <Text fontSize={"2xl"} m={"10px 0 10px"} p={"10px"}>
            Sign Up
          </Text>
        </Box>
        <Box
          bg={"brand.200"}
          borderRadius={"lg"}
          cursor={"pointer"}
          onClick={() => handleChange("signin", "signup")}
        >
          <Text fontSize={"2xl"} m={"10px 0 10px"} p={"10px"}>
            Sign In
          </Text>
        </Box>
      </HStack>
      <HStack
        id="signup"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <form onSubmit={handleSignUp}>
          <FormControl isRequired p={"lg"}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                dispatch({
                  type: "FORM_VALUE",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
              placeholder="Full Name"
            />
            <br /> <br />
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              onChange={(e) => {
                dispatch({
                  type: "FORM_VALUE",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
            <FormHelperText color={"brand.600"}>
              We'll never share your email.
            </FormHelperText>
            <br />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                dispatch({
                  type: "FORM_VALUE",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
            <br />
            <br />
            <Checkbox>
              By submitting this form, you agree to our terms of service.
            </Checkbox>
            <br />
            <br />
            <br />
            <Input
              type="submit"
              value={"Submit"}
              variant={"outline"}
              fontSize={"lg"}
              w={"fit-content"}
              _hover={{
                bgGradient: "linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )",
                color: "black",
                cursor: "pointer",
              }}
            />
          </FormControl>
        </form>
        <Box
          bgGradient={"linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"}
          color={"black"}
          backgroundColor={"brand.200"}
          borderRadius={"md"}
          boxShadow="lg"
          p={"50px 30px "}
        >
          <HStack align={"center"} justifyContent={"space-between"}>
            <Text fontSize={"xl"} as={"b"}>
              Become Member
            </Text>
            <Image
              w={"40px"}
              src={"https://cdn-icons-png.flaticon.com/512/10289/10289518.png"}
            />
          </HStack>

          <br />
          <br />
          <Text as={"i"}>
            Get High Quality <br /> Treatments and Boosters with <br />{" "}
            Discounted Price.
          </Text>
        </Box>
      </HStack>
      <HStack
        display={"none"}
        id="signin"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        <form onSubmit={handleSignIn}>
          <FormControl isRequired p={"lg"}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              name="email"
              placeholder="Email"
              onChange={(e) => {
                dispatch({
                  type: "FORM_VALUE",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
            <br />
            <br />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                dispatch({
                  type: "FORM_VALUE",
                  payload: { name: e.target.name, value: e.target.value },
                });
              }}
            />
            <br />
            <br />

            <br />
            <br />
            <br />
            <Input
              type="submit"
              value={"Submit"}
              variant={"outline"}
              fontSize={"lg"}
              w={"fit-content"}
              _hover={{
                bgGradient: "linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )",
                color: "black",
                cursor: "pointer",
              }}
            />
          </FormControl>
        </form>
        <Box
          bgGradient={"linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"}
          color={"black"}
          backgroundColor={"brand.200"}
          borderRadius={"md"}
          boxShadow="lg"
          p={"50px 30px "}
        >
          <HStack align={"center"} justifyContent={"space-between"}>
            <Text fontSize={"xl"} as={"b"}>
              Become Member
            </Text>
            <Image
              w={"40px"}
              src={"https://cdn-icons-png.flaticon.com/512/10289/10289518.png"}
            />
          </HStack>

          <br />
          <br />
          <Text as={"i"}>
            Get High Quality <br /> Treatments and Boosters with <br />{" "}
            Discounted Price.
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
