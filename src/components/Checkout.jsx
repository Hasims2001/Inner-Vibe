import {
  Image,
  Heading,
  Box,
  Text,
  AlertIcon,
  Input,
  VStack,
  HStack,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Alert,
} from "@chakra-ui/react";
import paymentImg from "../img/payment.png";
import { useState, useReducer } from "react";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/AuthContextProvider";
import { reducer } from "../utills/reducer";
import { postSalesData } from "../utills/api";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
function Checkout() {
  const [appoinment, setAppoinment] = useState("");
  const [payment, setPayment] = useState("");
  const { authState } = useContext(AuthContext);
  const [status, setStatus] = useState(false);
  let navigate = useNavigate();
  let total = JSON.stringify(localStorage.getItem("total"));
  let cartId = localStorage.getItem("cartId");
  total = JSON.parse(total);
  console.log(cartId);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
  });
  if (!total) {
    return <Error />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let val = {
      appoinment: appoinment,
      payment: payment,
      totalAmout: Number(total),
      userId: authState.id,
    };

    const posting = async () => {
      dispatch({ type: "LOADING" });
      try {
        let res = await postSalesData(val);
        setStatus(true);
        dispatch({ type: "LOADING_COMPLETED" });
        localStorage.removeItem("total");
        localStorage.removeItem("cartId");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (err) {
        dispatch({ type: "ERROR" });
        console.log(err);
      }
    };
    posting();
  };

  if (state.loading) {
    return <Heading>Loading...</Heading>;
  }
  return (
    <Box m="30px 0">
      <Heading as={"h3"}>Checkout</Heading>
      <HStack justifyContent={"space-between"}>
        <VStack m={"30px 0"} w={"100%"}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Choose Date For Appoinment</FormLabel>

              <Input
                type="date"
                value={appoinment}
                w={"fit-content"}
                onChange={(e) => setAppoinment(e.target.value)}
              />
              <br />
              <br />
              <br />
              <FormLabel>Payment</FormLabel>
              <RadioGroup
                onChange={setPayment}
                value={payment}
                style={{ fontSize: "20px" }}
              >
                <Stack direction="row">
                  <Radio size="lg" value="cash">
                    Cash
                  </Radio>
                  <Radio size="lg" value="upi">
                    UPI
                  </Radio>
                  <Radio size="lg" value="netbank">
                    Net Banking
                  </Radio>
                  <Radio size="lg" value="card">
                    credit / debit card
                  </Radio>
                </Stack>
              </RadioGroup>
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
        </VStack>
        <VStack w={"fit-content"}>
          <Image src={paymentImg} w={"50%"} alt="checkout" />
        </VStack>
      </HStack>
      {status && (
        <Alert status="success" color={"brand.200"}>
          <AlertIcon />
          Your order has been placed! <br />
          Thank you for shopping with us. <br />
        </Alert>
      )}
    </Box>
  );
}
export default Checkout;
