import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={AppTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
