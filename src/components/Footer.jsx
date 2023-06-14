import {
  Box,
  Text,
  Button,
  Heading,
  HStack,
  VStack,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Footer() {
  const links = [
    { title: "Treatment", to: "/Treatment" },
    { title: "Blog", to: "/Blog" },
    { title: "About ", to: "/About" },
    { title: "Contact", to: "/Contact" },
    { title: "Terms & Condition", to: "/TermsCondition" },
    { title: "Privacy Policy", to: "/PrivacyPolicy" },
  ];
  const social = [
    { title: "Instagram", to: "https://www.instagram.com/" },
    { title: "Facebook", to: "https://www.facebook.com/" },
  ];
  return (
    <HStack
      justifyContent={"space-between"}
      m={"50px 190px"}
      pb={"50px"}
      alignItems={"flex-start"}
    >
      <VStack alignItems={"flex-start"}>
        <Heading as={"h2"}>Inner Vibe</Heading>
        <Text as="i">Unleash Your Inner Vitality</Text>
      </VStack>
      <VStack alignItems={"flex-start"}>
        <Heading as={"h5"} size={"lg"}>
          Links
        </Heading>
        {links.map((item, ind) => (
          <Link
            to={item.to}
            key={item.title}
            onMouseOver={() => {
              const temp = document.querySelector(`.underline_${ind}`);
              if (temp) {
                temp.style.visibility = "visible";
              }
            }}
            onMouseOut={() => {
              const temp = document.querySelector(`.underline_${ind}`);
              if (temp) {
                temp.style.visibility = "hidden";
              }
            }}
          >
            {item.title}
            <Box
              className={`underline_${ind}`}
              visibility={"hidden"}
              bgGradient="linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"
              style={{
                width: "100%",
                height: "1px",
              }}
            />
          </Link>
        ))}
      </VStack>
      <VStack alignItems={"flex-start"}>
        <Heading as={"h5"} size={"lg"}>
          Connect
        </Heading>
        {social.map((item, ind) => (
          <Link
            to={item.to}
            key={item.title}
            onMouseOver={() => {
              const temp = document.querySelector(`.underline${ind}`);
              if (temp) {
                temp.style.visibility = "visible";
              }
            }}
            onMouseOut={() => {
              const temp = document.querySelector(`.underline${ind}`);
              if (temp) {
                temp.style.visibility = "hidden";
              }
            }}
          >
            {item.title}
            <Box
              className={`underline${ind}`}
              visibility={"hidden"}
              bgGradient="linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"
              style={{
                width: "100%",
                height: "1px",
              }}
            />
          </Link>
        ))}
        <br />
        <Heading as={"h5"} size={"md"} lineHeight={"lg"}>
          NewsLetter
        </Heading>
        <Input type="email" placeholder="Your Email" size={"sm"}></Input>
        <Button variant={"GradientPrimary"} size={"sm"}>
          Subscribe Now
        </Button>
      </VStack>
    </HStack>
  );
}
export default Footer;
