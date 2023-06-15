import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import ThemeContextProvider from './contextProvider/ThemeContextProvider';
import { BrowserRouter } from 'react-router-dom';
import Theme from './contextProvider/Theme';
import AuthContextProvider from './contextProvider/AuthContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={Theme}>
    <AuthContextProvider>
    <ThemeContextProvider >
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
