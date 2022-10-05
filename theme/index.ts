import { extendTheme } from "@chakra-ui/react";

const AppTheme = extendTheme({
  colors: {
    notblue: "blue",
  },
  components: {
    Card: {
      baseStyle: {
        bg: "gray.50",
        boxShadow: "md",
        borderRadius: "xl",
        p: "4",
        display: "flex",
        flexDir: "column", 
        gridRowGap: "3"
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: "36px",
    },
    h2: {
      fontSize: "22px",
    },
    label: {
      fontSize: "13px",
    },
  },
});

export default AppTheme;
