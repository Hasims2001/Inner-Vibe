import Header from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./contextProvider/ThemeContextProvider";
import AllRouters from "./allRouters/AllRouters";
import { Box } from "@chakra-ui/react";
import Footer from './components/Footer';
import { AuthContext } from "./contextProvider/AuthContextProvider";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Admin from "./components/Admin";
// API Link : https://important-boot-bat.cyclic.app/

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { authState } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    let url = window.location.href;
    if (url.includes("Admin")) {
      setFlag(true);
    }
  }, [window.location.href])
  return (
    <div className="App" style={{ minHeight: "100vh", backgroundColor: theme ? "#181919" : "#FFFFFF", color: theme ? "#FFFFFF" : "#000" }}>
      {!flag && <Box>
        <Header />
        <Box style={{ margin: '0px 190px' }}>
          <AllRouters />
        </Box>
        <Footer />
      </Box>}

      {flag && <Box > <AllRouters /></Box>}

    </div>
  );
}

export default App;
library.add(far, fas, fab)
