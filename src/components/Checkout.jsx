import {
  Image,
  Heading,
  Box,
  useToast,
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
import { useState, useReducer, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/AuthContextProvider";
import { reducer } from "../utills/reducer";
import { postSalesData, fetchbyId } from "../utills/api";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Checkout() {
  const [appoinment, setAppoinment] = useState("");
  const [payment, setPayment] = useState("");
  const { authState } = useContext(AuthContext);
  const toast = useToast();
  const [status, setStatus] = useState(false);
  let navigate = useNavigate();
  let total = JSON.stringify(localStorage.getItem("total"));
  let cartId = localStorage.getItem("cartId");
  total = JSON.parse(total);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,

    error: false,
  });
  const [cardNum, setCardNum] = useState([]);
  const [productData, setProductData] = useState([]);
  let date = new Date();
  useEffect(() => {
    for (let i = 0; i < cartId.length; i++) {
      if (Number(cartId[i]) && !cardNum.includes(Number(cartId[i]))) {
        setCardNum([...cardNum, Number(cartId[i])]);
      }
    }
    const getData = async () => {
      try {
        for (let i = 0; i < cardNum.length; i++) {
          let res = await fetchbyId(cardNum[i]);
          setProductData([...productData, res.data]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    let val = {
      appoinment: appoinment,
      payment: payment,
      totalAmout: Number(total),
      treatment: productData,
      date: date,
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
        toast({
          title: `Your order has been placed!`,
          status: "success",
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } catch (err) {
        console.log(err);
      }
    };
    posting();
  };

  if (state.loading) {
    return <Loading />;
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
