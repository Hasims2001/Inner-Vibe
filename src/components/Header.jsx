import { Image, Heading, Box, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../img/translogo.png";
import { useContext } from "react";
import Theme from "../contextProvider/Theme";
import { ThemeContext } from "../contextProvider/ThemeContextProvider";
import { AuthContext } from "../contextProvider/AuthContextProvider";
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authState } = useContext(AuthContext);

  const bgcolorCode = theme ? "#2d2d2d" : "#FFFFFF";
  const colorCode = theme ? "#FFFFFF" : "#121212";
  const btn = [
    { title: "Treatment", to: "/Treatment" },
    { title: "Blog", to: "/Blog" },
    { title: "Contact", to: "/Contact" },
    // { title: "Sign in/Sign up", to: "/SignIn" },
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
              backgroundColor: bgcolorCode,
              color: colorCode,
              padding: "10px 25px",
            }}
          >
            {title}
          </Link>
          // </Box>
        ))}
        {!authState.isAuth && (
          <Box
            bgGradient={"linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"}
            color={"brand.100"}
            p={"10px 25px"}
            borderRadius={"10px"}
          >
            <Link to={"/SignIn"}>Sign in/Sign up</Link>
          </Box>
        )}
        {authState.isAuth && (
          <Box
            bgGradient={"linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"}
            color={"brand.100"}
            p={"15px 4"}
            borderRadius={"100%"}
          >
            <Link to={"/Profile"}>
              <Image
                w={"45px"}
                p={"10px"}
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              />
            </Link>
          </Box>
        )}
      </Stack>
    </div>
  );
}
export default Header;
