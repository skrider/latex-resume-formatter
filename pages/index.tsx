import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [pdf, setPdf] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const { PdfTeXEngine } = await import("../swift/PdfTeXEngine");
        const engine = new PdfTeXEngine();
        console.log(engine);
        await engine.loadEngine();
        console.log(engine);
        engine.writeMemFSFile(
          "main.tex",
          `
\\documentclass{article}
\\begin{document}
  hello from swift 
\\end{document}
`
        );
        engine.setEngineMainFile("main.tex");
        let res = await engine.compileLaTeX();
        setPdf(res);
        console.log("pdf generated");
        console.log(res);
      } catch (e: any) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Box color="black">
      Hello world
      <iframe src="/resume-placeholder.pdf" />
      {pdf ? (
        <embed
          src={`data:application/pdf;base64,${new TextDecoder().decode(
            pdf.pdf
          )}`}
        />
      ) : (
        "loading..."
      )}
      {pdf && new TextDecoder().decode(pdf.pdf)}
    </Box>
  );
};

export default Home;
