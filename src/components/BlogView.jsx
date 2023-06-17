import { useParams, Link } from "react-router-dom";
import { Box, Text, Heading, VStack, Image, HStack } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import { fetchBlogIdData } from "../utills/api";
import { reducer } from "../utills/reducer";
import Loading from "./Loading";
import Error from "./Error";
function BlogView() {
  const { blogId } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: {},
    error: false,
  });
  const { loading, data, error } = state;
  useEffect(() => {
    dispatch({ type: "LOADING" });
    const fetching = async (blogId) => {
      try {
        let res = await fetchBlogIdData(blogId);
        res = res?.data;
        console.log(res);
        dispatch({ type: "FATCHED", payload: res });
      } catch (err) {
        dispatch({ type: "ERROR" });
        console.log(err);
      }
    };
    fetching(blogId);
    setTimeout(() => {}, 3000);
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Box mt={"30px"}>
      <Text>
        <Link to="/">Home</Link> / <Link to={"/Blog"}> Blog </Link> / {blogId}
      </Text>

      {Object.keys(data).length > 0 && (
        <VStack alignItems={"flex-start"} fontSize={"lg"}>
          <Heading as="h3" m={"20px 0"}>
            {data.title}
          </Heading>
          <Image
            src={data.image[0]}
            alt={data.title}
            borderRadius={"10px"}
            m={"20px auto"}
            w={"50%"}
          />
          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[0]}</Text>
          </HStack>

          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[1]}</Text>
          </HStack>
          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[2]}</Text>
          </HStack>
          <Image
            src={data.image[1]}
            alt={data.title}
            borderRadius={"10px"}
            m={"20px auto"}
            w={"50%"}
          />
          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[3]}</Text>
          </HStack>
          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[4]}</Text>
          </HStack>
          <Image
            src={data.image[2]}
            alt={data.title}
            borderRadius={"10px"}
            m={"20px auto"}
            w={"50%"}
          />
          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[5]}</Text>
          </HStack>
          <Image
            src={data.image[3]}
            alt={data.title}
            borderRadius={"10px"}
            m={"20px auto"}
            w={"50%"}
          />
          <HStack alignItems={"flex-start"}>
            <Box
              w={"50px"}
              bg={"brand.400"}
              h={"16px"}
              mt={"5px"}
              borderRadius={"full"}
            ></Box>
            <Text textIndent={"20px"}>{data.content[6]}</Text>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
export default BlogView;
