import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box color="black">
      Hello world
      <iframe src="/resume-placeholder.pdf" />
    </Box>
  );
};

export default Home;
