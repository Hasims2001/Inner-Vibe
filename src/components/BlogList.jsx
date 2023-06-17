import {
  Box,
  Heading,
  Text,
  VStack,
  Card,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogData } from "../utills/api";
import { reducer } from "../utills/reducer";
import Error from "./Error";
import Loading from "./Loading";
function BlogList() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: [],
    error: false,
  });
  const { loading, data, error } = state;
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const totalPage = 4;

  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetching = async () => {
      try {
        let res = await fetchBlogData(page, limit);
        res = res?.data;
        dispatch({ type: "FATCHED", payload: res });
      } catch (err) {
        dispatch({ type: "ERROR" });
        console.log(err);
      }
    };
    fetching();
  }, [page, limit]);
  const imgArr = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=920&q=80",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=853&q=80",
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=860&q=80",
    "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1579864795584-092b04e14e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=889&q=80",
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=890&q=80",
  ];

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Box m={"30px 0"}>
      <Text>
        <Link to="/">Home</Link> / Blog
      </Text>
      <Heading as="h3" m={"10px 0"}>
        Blog
      </Heading>
      <VStack m={"20px 0"} spacing={"20px"} align={"left"}>
        {data.map((item, ind) => (
          <Link to={`/Blog/${item.id}`}>
            <Card
              key={ind}
              padding={"20px"}
              bg={"brand.200"}
              color={"brand.600"}
            >
              <HStack spacing={"20px"} alignItems={"flex-start"}>
                <img
                  src={
                    imgArr[Number(Math.floor(Math.random() * (5 - 0 + 1) + 0))]
                  }
                  alt={item.title}
                  width={"30%"}
                  style={{ borderRadius: "10px" }}
                />
                <VStack>
                  <Heading
                    as={"h3"}
                    mt={"5px"}
                    fontWeight={"normal"}
                    fontSize={"3xl"}
                  >
                    {item.title}
                  </Heading>
                  <Text textOverflow={"ellipsis"} overflow={"hidden"}>
                    {item.content[0]}
                  </Text>
                </VStack>
              </HStack>
            </Card>
          </Link>
        ))}
      </VStack>
      <HStack justifyContent={"center"}>
        {Array.from({ length: totalPage }).map((item, ind) => (
          <Button
            bg={ind + 1 === page ? "brand.400" : "brand.200"}
            color={ind + 1 === page ? "brand.100" : "brand.600"}
            _hover={{ bg: "brand.400", color: "brand.100" }}
            key={ind}
            onClick={() => setPage(ind + 1)}
            disabled={ind + 1 === page}
          >
            {ind + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
}
export default BlogList;
