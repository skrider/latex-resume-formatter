import React from "react";
import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

type CardProps = {
  children?: React.ReactNode[];
} & BoxProps;

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  const styles = useStyleConfig("Card");

  return (
    <Box __css={styles} {...props}>
      {children}
    </Box>
  );
};

export default Card;
