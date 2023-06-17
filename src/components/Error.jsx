import { Flex, Heading, Image } from "@chakra-ui/react";
import err from "../img/error.png";
function Error() {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}
    >
      <Image w={"50%"} src={err} alt="Error Image" />
      <Heading textAlign={"center"} fontWeight={"normal"}>
        Something Went Wrong...
        <br /> Please Try Again....
      </Heading>
    </Flex>
  );
}
export default Error;
