"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819",
  },
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-uubmit4tpy5bi5v1.us.auth0.com"
      clientId="GbmkArnbfqtiCH6dxQqqTdBAXpTJvsqv"
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      {" "}
      <ChakraProvider>{children}</ChakraProvider>
    </Auth0Provider>
  );
}
