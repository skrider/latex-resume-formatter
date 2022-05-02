import { Box, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const [pdf, setPdf] = useState<any>(null);
  const [content, setContent] = useState<string>("");
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
        console.log("pdf generated");
        console.log(res);
        const b64 = Buffer.from(res.pdf as Uint8Array);
        setPdf(b64);
      } catch (e: any) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Box
      height="100vh"
      width="100vw"
      bg="green"
      display="grid"
      gridTemplateColumns="1fr 1fr"
      __css={{
        "& embed": {
          "grid-column": "2",
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Input
        onChange={(event) => setContent(event.target.value)}
        value={content}
      />
      {pdf ? (
        <embed src={`data:application/pdf;base64,${pdf.toString("base64")}`} />
      ) : (
        "loading..."
      )}
    </Box>
  );
};

export default Home;
