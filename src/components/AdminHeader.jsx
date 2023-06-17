import logo from "../img/logo.png";
import { Box, Stack, Heading, Image, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function AdminHeader() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Link to="/">
        <Stack direction="row" align="center">
          <Heading as={"h2"} padding="20px 0 20px 0" fontSize="4xl">
            Inner Vibe
          </Heading>
          <Image
            borderRadius="full"
            boxSize="70px"
            src={logo}
            alt="InnerVibeLogo"
          />
        </Stack>
      </Link>
      <HStack spacing={"20px"}>
        <Link to="/Sales">
          <Button p={" 20px 30px"} variant={"SimplePrimary"}>
            Sales
          </Button>
        </Link>
        <Link to="/Users">
          <Button p={" 20px 30px"} variant={"SimplePrimary"}>
            Users
          </Button>
        </Link>
        <Link to="/Blogs">
          <Button p={" 20px 30px"} variant={"SimplePrimary"}>
            Blogs
          </Button>
        </Link>
        <Link to="/Admins">
          <Button p={" 20px 30px"} variant={"SimplePrimary"}>
            Admins
          </Button>
        </Link>
      </HStack>
    </div>
  );
}
export default AdminHeader;
