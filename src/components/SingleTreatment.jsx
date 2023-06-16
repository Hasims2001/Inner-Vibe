import uprightarrow from "../img/up-right-arrow.png";
import { useContext, useEffect, useReducer, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { singleData } from "../utills/api.js";
import { reducer } from "../utills/reducer.js";
import { AuthContext } from "../contextProvider/AuthContextProvider";
function SingleTreatment() {
  const { tId } = useParams();
  const navigate = useNavigate();
  const divider = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
    error: false,
  });

  const { authState } = useContext(AuthContext);
  const { loading, data, error } = state;
  const [desc, setDesc] = useState([]);
  const [presentCartId, setPresentCartId] = useState(0);
  let [localcart, setLocalCart] = useState([]);
  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetchData = async () => {
      try {
        let res = await singleData(tId);
        setDesc(res.data.description);
        // setPresentCartId(res.data.id);
        dispatch({ type: "FATCHED", payload: res?.data });
      } catch (err) {
        dispatch({ type: "ERROR" });
        console.log(err);
      }
    };
    fetchData();

    let cartId = localStorage.getItem("cartId");
    cartId = JSON.parse(cartId);
    if (!cartId) {
      cartId = [];
      setLocalCart(cartId);
    } else {
      setLocalCart(cartId);
    }
  }, [tId]);

  const checkCart = (chekId) => {
    let addto = document.getElementById(`addtocart`);
    let viewto = document.getElementById(`viewcart`);
    console.log(chekId);
    if (localcart.includes(chekId)) {
      // setPresentCart(true);
      addto.style.display = "none";
      viewto.style.display = "flex";
    } else {
      addto.style.display = "flex";
      viewto.style.display = "none";
    }
  };

  const handleClick = () => {
    // if (!authState.isAuth) {
    //   return navigate("/SignIn");
    // } else {

    localcart.push(data.id);
    localStorage.setItem("cartId", JSON.stringify(localcart));
    checkCart(data.id);
    // }
  };

  if (loading) {
    return (
      <Box mt={"30px"}>
        <Heading>Loading...</Heading>
      </Box>
    );
  }
  if (error) {
    return (
      <Box mt={"30px"}>
        <Heading>
          Something Went Wrong... <br /> Please Try Again....
        </Heading>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box mt={"30px"}>
        <Heading>
          Something Went Wrong... <br /> Please Try Again....
        </Heading>
      </Box>
    );
  }
  return (
    <Box mt={"30px"}>
      <Text>
        <Link to="/Treatment">Treatment</Link> / {data.name}
      </Text>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <FontAwesomeIcon
            icon={data.lightIcon}
            fontSize={"35px"}
            style={{ color: data.iconColor }}
          />
          <Heading as="h3" m={"10px 0"}>
            {data.name}
          </Heading>
        </HStack>
        <HStack spacing={7}>
          <Text fontSize={"20px"} as={"b"}>
            $ {data.price}
          </Text>
          <VStack id="addtocart" cursor={"pointer"} onClick={handleClick}>
            <Text>Add to Cart</Text>

            <Box
              bgGradient="linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"
              style={{
                width: "100%",
                height: "1px",
              }}
            />
          </VStack>
          <VStack id="viewcart" style={{ display: "none" }}>
            <Link to={"/Cart"}>
              <VStack>
                <HStack>
                  <Text>View Cart</Text>
                  <Image w={"10px"} src={uprightarrow} />
                </HStack>
                <Box
                  bgGradient="linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"
                  style={{
                    width: "100%",
                    height: "1px",
                  }}
                />
              </VStack>
            </Link>
          </VStack>
          <Link to={"/Checkout"}>
            <Button variant={"GradientPrimary"}>Book Now</Button>
          </Link>
        </HStack>
      </HStack>
      <VStack m={"50px 0"}>
        {desc.map((item, ind) => (
          <Box key={ind} m={"20px 0"}>
            <HStack>
              <Box
                w={"10px"}
                bg={"brand.400"}
                h={"10px"}
                borderRadius={"full"}
              ></Box>
              <Text m={"10px 0"} fontSize={"lg"} as={"i"}>
                {item.title}
              </Text>
            </HStack>
            <Text m={"5px 0"}>{item.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
export default SingleTreatment;
