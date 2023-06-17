import { Box, HStack, Card, Heading, Button, Text } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../utills/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reducer } from "../utills/reducer.js";
import Loading from "./Loading";
import Error from "./Error.jsx";
function Cart() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
    error: false,
  });
  const [cartData, setCartData] = useState([]);
  const { loading, data, error } = state;
  let cartIds = JSON.stringify(localStorage.getItem("cartId")) || [];
  cartIds = JSON.parse(cartIds);
  // let cartIds = localStorage.getItem("cartId") || [];

  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetchDataIds = async () => {
      try {
        let res = await fetchData();
        res = res?.data;
        dispatch({ type: "FATCHED", payload: res });
        let temp = [];
        for (let i = 0; i < res.length; i++) {
          if (cartIds.includes(res[i].id)) {
            temp.push(res[i]);
          }
        }
        let total = temp.reduce((acc, curr) => acc + curr.price, 0);

        localStorage.setItem("total", JSON.stringify(total));
        setCartData(temp);
      } catch (err) {
        dispatch({ type: "ERROR" });
        console.log(err);
      }
    };
    fetchDataIds();
    dispatch({ type: "LOADING" });
  }, []);

  const setRemove = (id) => {
    console.log(cartIds);
    // let filtered = cartIds.filter((item) => item.id !== id);
    // console.log(filtered);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Box m={"30px 0"}>
      <HStack justifyContent={"space-between"}>
        <Heading as="h3" m={"10px 0"}>
          Cart
        </Heading>
      </HStack>
      <HStack alignItems={"flex-start"}>
        <Card
          bg={"brand.200"}
          color={"brand.600"}
          p={"30px"}
          m="20px 0"
          w={"50%"}
          fontSize={"2xl"}
        >
          <Text fontSize={"3xl"}>Cart Items</Text>
          <br />
          <hr />
          <br />
          {cartData.map(({ id, name, price, iconColor, lightIcon }) => (
            <Box key={id}>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <FontAwesomeIcon
                    icon={lightIcon}
                    fontSize={"35px"}
                    style={{ color: iconColor }}
                  />
                  <Text>{name}</Text>
                </HStack>
                <Button
                  id={id}
                  w={"5px"}
                  borderRadius={"full"}
                  variant={"GradientPrimary"}
                  onClick={(e) => setRemove(e.target.id)}
                >
                  X
                </Button>
              </HStack>
              <Text>$ {price}</Text>
              <br />
            </Box>
          ))}
        </Card>
        <Card
          bgGradient={"linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"}
          color={"brand.100"}
          p={"30px"}
          m="20px 0"
          w={"50%"}
          fontSize={"2xl"}
        >
          <Text fontSize={"3xl"}>Order Summary</Text>
          <br />
          {cartData.map(({ id, name, price }) => (
            <HStack key={id} justifyContent={"space-between"}>
              <Text>{name}</Text>
              <Text>$ {price}</Text>
            </HStack>
          ))}
          <br />
          <hr style={{ color: "black" }} />
          <HStack justifyContent={"space-between"}>
            <Text>Total : </Text>
            <Text>$ {cartData.reduce((acc, curr) => acc + curr.price, 0)}</Text>
          </HStack>
          <br />
          <Link to={"/Checkout"} style={{ textAlign: "center" }}>
            <Button justifyContent={"center"} variant={"SimplePrimary"}>
              Book Now
            </Button>
          </Link>
        </Card>
      </HStack>
    </Box>
  );
}
export default Cart;
