import {
  Box,
  Checkbox,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import debounce from "lodash.debounce";
import { PdfTeXEngine } from "../swift/PdfTeXEngine";
import { Field, Form } from "react-final-form";

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
    <Form
      onSubmit={() => {}}
      render={() => (
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
          <Box
            p="3"
            borderRadius="3"
            display="grid"
            gridAutoRows="auto"
            gridRowGap="3"
          >
            <Field
              name="content.name"
              type="input"
              render={({ input }) => <Input {...input} />}
            />
            <Field
              name="content.phone_number"
              type="input"
              render={({ input }) => <Input {...input} />}
            />
            <Field
              name="content.linkedin_url"
              type="input"
              render={({ input }) => <Input {...input} />}
            />
            <Field
              name="content.personal_website_url"
              type="input"
              render={({ input }) => <Input {...input} />}
            />
            <Field
              name="meta.show_gpa"
              type="checkbox"
              render={({ input }) => (
                <>
                  <Checkbox {...input}>Show GPA</Checkbox>
                  {input.checked && (
                    <Field
                      name="content.gpa"
                      type="number"
                      render={({ input }) => (
                        <NumberInput
                          {...input}
                          precision={2}
                          defaultValue={4.0}
                          min={0}
                          max={4}
                          step={0.1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    />
                  )}
                </>
              )}
            />
            <Field
              name="meta.show_high_school"
              type="checkbox"
              render={({ input }) => (
                <>
                  <Checkbox {...input}>Show High School</Checkbox>
                  {input.checked && (
                    <>
                      <Field
                        name="content.high_school.name"
                        type="input"
                        render={({ input }) => <Input {...input} />}
                      />
                    </>
                  )}
                </>
              )}
            />
          </Box>
          {pdf ? (
            <embed
              src={`data:application/pdf;base64,${pdf.toString("base64")}`}
            />
          ) : (
            "loading..."
          )}
        </Box>
      )}
    />
  );
};

export default Home;
