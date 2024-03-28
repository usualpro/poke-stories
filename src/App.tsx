import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <ChakraProvider>
      <Outlet />
      <Home />
    </ChakraProvider>
  );
};
