import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import debounce from "lodash.debounce";
import { PdfTeXEngine } from "../swift/PdfTeXEngine";

const Home: NextPage = () => {
  const [pdf, setPdf] = useState<any>(null);
  const [content, setContent] = useState<string>("type some \\LaTeX");
  let [engine, setEngine] = useState<PdfTeXEngine | null>(null);

  const renderPdf = useCallback(
    debounce((arg_content: string) => {
      if (engine) {
        (async () => {
          engine.writeMemFSFile(
            "main.tex",
            `\\documentclass{article}
\\begin{document}
${arg_content}
\\end{document}
`
          );
          const result = await engine.compileLaTeX();
          if (result.pdf) {
            setPdf(Buffer.from(result.pdf));
          }
        })();
      }
    }, 400),
    [engine]
  );

  useEffect(() => {
    (async () => {
      try {
        const { PdfTeXEngine } = await import("../swift/PdfTeXEngine");
        engine = new PdfTeXEngine();
        await engine.loadEngine();
        engine.setEngineMainFile("main.tex");
        // sorta fucked state etiquette here
        setEngine(engine);
        renderPdf(content);
      } catch (e: any) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Box
      height="100vh"
      width="100vw"
      bg="gray.50"
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
      <Box width="100%" padding="2rem">
        <Text fontSize="18px" color="black" mb="0.5rem">
          Write something:
        </Text>
        <Textarea
          bg="white"
          onChange={(event) => {
            setContent(event.target.value);
            renderPdf(event.target.value);
          }}
          value={content}
        />
      </Box>
      {pdf ? (
        <embed src={`data:application/pdf;base64,${pdf.toString("base64")}`} />
      ) : (
        "loading..."
      )}
    </Box>
  );
};

export default Home;
