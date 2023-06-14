import { Image, Heading, Box, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../img/translogo.png";
import { useContext } from "react";
import { ThemeContext } from "../contextProvider/ThemeContextProvider";
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const btn = [
    { title: "Treatment", to: "/Treatment" },
    { title: "Blog", to: "/Blog" },
    { title: "About Us", to: "/About" },
    { title: "Contact", to: "/Contact" },
  ];
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
      <Stack direction="row" spacing={2} align="center">
        {btn.map(({ title, to }) => (
          // <Box>
          <Link
            key={title}
            to={to}
            style={{
              borderRadius: "10px",
              backgroundColor: theme ? "#3c3c3c" : "#FFFFFF",
              color: theme ? "#FFFFFF" : "#000",
              padding: "10px 25px",
            }}
          >
            {title}
          </Link>
          // </Box>
        ))}
      </Stack>
    </div>
  );
}
export default Header;
