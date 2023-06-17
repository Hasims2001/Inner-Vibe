import {
  HStack,
  Heading,
  Box,
  Text,
  Image,
  SimpleGrid,
  GridItem,
  Container,
  SkeletonCircle,
  SkeletonText,
  Select,
  Input,
} from "@chakra-ui/react";
import Theme from "../contextProvider/Theme";
import uprightarrow from "../img/up-right-arrow.png";
import { fetchProductData } from "../utills/api.js";
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { reducer } from "../utills/reducer.js";

import { DebounceInput } from "react-debounce-input";
const init = {
  loading: true,
  data: [],
  error: false,
};

function Treatment() {
  const [sorting, setsorting] = useState("");
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(reducer, init);
  const { loading, data, error } = state;
  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetching = async (sorting, search) => {
      try {
        let res = await fetchProductData(sorting, search);
        dispatch({ type: "FATCHED", payload: res?.data });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };
    fetching(sorting, search);
  }, [sorting, search]);

  if (loading) {
    return (
      <Box mt={"30px"}>
        <HStack justifyContent={"space-between"}>
          <Heading as="h3">Treatment Menu</Heading>
          <Text>
            We offer a wide range of therapies and booster <br /> suppliments
          </Text>
        </HStack>
        <SimpleGrid spacing={5} columns={3} m={"40px 0"}>
          {new Array(20).fill(0).map((i, ind) => (
            <GridItem key={ind}>
              <Box
                padding="50px"
                m={"10px 0"}
                borderRadius={"md"}
                boxShadow="lg"
                bg="brand.200"
              >
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={2}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        Something Went Wrong... <br /> Please Try Again...
      </Container>
    );
  }
  return (
    <Box mt={"30px"}>
      <HStack justifyContent={"space-between"}>
        <Heading as="h3">Treatment Menu</Heading>
        <Text>
          We offer a wide range of therapies and booster <br /> suppliments
        </Text>
      </HStack>
      <br />
      <br />
      <HStack spacing={20}>
        {/* <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <DebounceInput
          className="px-2"
          style={{
            backgroundColor: "#2d2d2d",
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            outline: "none",
            border: "1px solid #86FFA3",
          }}
          placeholder="search here..."
          minLength={1}
          value={search}
          debounceTimeout={1000}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={sorting}
          onChange={(e) => {
            setsorting(e.target.value);
          }}
        >
          <option value={""} style={{ backgroundColor: "#2d2d2d" }}>
            Sort By Price
          </option>
          <option style={{ backgroundColor: "#2d2d2d" }} value={"asc"}>
            Low to High
          </option>
          <option style={{ backgroundColor: "#2d2d2d" }} value={"desc"}>
            High to Low
          </option>
        </Select>
      </HStack>
      <SimpleGrid spacing={5} columns={3} m={"40px 0"}>
        {data.map(({ id, name, price, lightIcon, darkIcon, iconColor }) => (
          <GridItem
            key={id}
            backgroundColor={"brand.200"}
            borderRadius={"md"}
            boxShadow="lg"
            p={"50px"}
          >
            <Link to={`/SingleTreatment/${id}`}>
              <FontAwesomeIcon
                icon={lightIcon}
                fontSize={"50px"}
                style={{ color: iconColor }}
              />
              <Text fontSize={"lg"} m={"10px 0"}>
                {name}
              </Text>
              <HStack justifyContent={"space-between"}>
                <Text>
                  $ <span style={{ fontSize: "25px" }}>{price}</span>
                </Text>

                <Box
                  border={"1px solid"}
                  borderColor={"brand.100"}
                  borderRadius={"md"}
                  p={"15px"}
                  _hover={{ borderColor: "brand.400", cursor: "pointer" }}
                >
                  <Image src={uprightarrow} w={"10px"} alt="uprightarrow" />
                </Box>
              </HStack>
            </Link>
            {/* </Box> */}
            {/* <Box
              id={`secondlook${id}`}
              style={{
                display: "none",
                overflowY: "scroll",
                height: "100%",
              }}
            >
              <Text>{description[0].title}</Text>
              <br />
              <Text>{description[0].content}</Text>
            </Box> */}
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Treatment;
