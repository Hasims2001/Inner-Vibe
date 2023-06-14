import { createContext } from "react";

export const ThemeContext = createContext();
function ThemeContextProvider(pros) {
  const obj = {
    theme: true,
    toggleTheme: () => {
      obj.theme = !obj.theme;
    },
  };
  //   if (obj.theme) {
  //     pros.children.BackgroundColor = "black";
  //   }
  return (
    <ThemeContext.Provider value={obj}>{pros.children}</ThemeContext.Provider>
  );
}
export default ThemeContextProvider;
