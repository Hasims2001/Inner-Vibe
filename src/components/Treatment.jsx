import { HStack, Heading, Box, Text } from "@chakra-ui/react";
function Treatment() {
  return (
    <Box mt={"10px"}>
      <HStack justifyContent={"space-between"}>
        <Heading as="h3">
          Treatment <br /> Menu
        </Heading>
        <Text>
          We offer a wide range of therapies and booster <br /> suppliments
        </Text>
      </HStack>
      <HStack></HStack>
    </Box>
  );
}
export default Treatment;
