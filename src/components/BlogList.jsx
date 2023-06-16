import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function BlogList() {
  return (
    <Box m={"30px 0"}>
      <Text>
        <Link to="/">Home</Link> / Blog
      </Text>
      <Heading as="h3" m={"10px 0"}>
        Blog
      </Heading>
    </Box>
  );
}
export default BlogList;
