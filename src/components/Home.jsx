import Bar from "../img/bar.png";
import homeIcon from "../img/home.png";
import Mobile from "../img/mobile.png";
import service from "../img/service.png";
import test from "../img/test.png";

// import ButtonStyle from "../styling/ButtonStyle";

import {
  Image,
  Box,
  Text,
  Stack,
  VStack,
  HStack,
  Button,
  Flex,
  Container,
} from "@chakra-ui/react";
import { ArrowDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box>
      <Container>
        <Box boxSize="sm" fontSize="7xl" h={"100%"}>
          <Image
            src={homeIcon}
            style={{
              maxWidth: "150%",
            }}
            alt="HomeIcon"
          />
          {/* <Text
            style={{
              position: "absolute",
              top: "45%",
              left: "40%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Infusion
          </Text>
          <Text
            style={{
              position: "absolute",
              top: "55%",
              left: "55%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Therapy
          </Text> */}
        </Box>
      </Container>
      <Stack direction={"row"} spacing="10px" justifyContent={"space-between"}>
        <VStack>
          <Image src={Bar} alt="Bar" />
          <Text>Delivered</Text>
          <Text>to You</Text>
        </VStack>
        <VStack>
          <Button
            borderRadius={"full"}
            ring={2}
            ringColor={"brand.400"}
            align={"center"}
            variant="SimplePrimary"
            style={{ margin: "auto 0", marginLeft: "100px", padding: "5px" }}
          >
            <ArrowDownIcon />
          </Button>
        </VStack>
        <HStack spacing={4} align={"center"}>
          <Link>
            Become a Member &nbsp; <ExternalLinkIcon />
            <Box
              bgGradient="linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"
              style={{
                width: "100%",
                height: "1px",
                // marginTop: "7px"
              }}
            />
          </Link>

          <Link to={"/book"}>
            <Button variant="GradientPrimary">
              Book Session &nbsp; <ExternalLinkIcon />
            </Button>
          </Link>
        </HStack>
      </Stack>
      <Flex justifyContent={"space-between"} gap={"20px"} mt={"100px"}>
        <VStack
          spacing={"10px"}
          w={"100%"}
          mt={"30px"}
          alignItems={"flex-start"}
        >
          <Text>
            Schedule Online <br />
            in minutes.
          </Text>
          <Text>
            Our Nurses <br />
            Come to You.
          </Text>
        </VStack>
        <HStack justifyContent={"flex-end"}>
          <Image src={Mobile} w={"35%"}></Image>
          <Image src={service} w={"35%"}></Image>
          <Image src={test} w={"35%"}></Image>
        </HStack>
      </Flex>
    </Box>
  );
}
export default Home;
