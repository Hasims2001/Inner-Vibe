import Header from "./components/Header";
import { useContext } from "react";
import {ThemeContext} from "./contextProvider/ThemeContextProvider";
import AllRouters from "./allRouters/AllRouters";
import { Box  } from "@chakra-ui/react";
import Footer from './components/Footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// API Link : https://important-boot-bat.cyclic.app/

function App() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <div className="App"  style={{  minHeight: "100vh", backgroundColor: theme ? "#181919" : "#FFFFFF", color: theme ? "#FFFFFF" : "#000"}}>
    <Header/>
    <Box style={{margin: '0px 190px'}}>
    <AllRouters  />
    </Box>
    <Footer  />
    </div>
  );
}

export default App;
library.add(far, fas, fab)
