import Header from "./components/Header";
import { useContext } from "react";
import {ThemeContext} from "./contextProvider/ThemeContextProvider";
import AllRouters from "./allRouters/AllRouters";
import { Box  } from "@chakra-ui/react";
import Footer from './components/Footer';
function App() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <div className="App"  style={{  backgroundColor: theme ? "#181919" : "#FFFFFF", color: theme ? "#FFFFFF" : "#000"}}>
    <Header/>
    <Box style={{margin: '0px 190px'}}>
    <AllRouters  />
    </Box>
    <Footer />
    </div>
  );
}

export default App;
