import { useEffect, useReducer, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Card,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { singleData } from "../utills/api.js";
import { reducer } from "../utills/reducer.js";

function SingleTreatment() {
  const { tId } = useParams();
  const divider = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
    error: false,
  });
  const { loading, data, error } = state;
  const [desc, setDesc] = useState([]);
  useEffect(() => {
    dispatch({ type: "LOADING" });
    singleData(tId)
      .then((res) => {
        setDesc(res.data.description);
        dispatch({ type: "FATCHED", payload: res?.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
        console.log(err);
      });
  }, [tId]);

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
  console.log(desc);
  return (
    <Box mt={"30px"}>
      <Text>
        <Link to="/Treatment">Treatment</Link> / {data.name}
      </Text>
      <HStack justifyContent={"space-between"}>
        <Heading as="h3" m={"10px 0"}>
          {data.name}
        </Heading>
        <HStack spacing={7}>
          <Text fontSize={"20px"} as={"b"}>
            $ {data.price}
          </Text>
          <Button variant={"GradientPrimary"}>Book Now</Button>
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
