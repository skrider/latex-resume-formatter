import { Box, Checkbox, Text } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import debounce from "lodash.debounce";
import { PdfTeXEngine } from "../swift/PdfTeXEngine";
import { Field, Form, FormSpy } from "react-final-form";
import AppInput from "../components/AppInput";
import AppNumberInput from "../components/AppNumberInput";
import Card from "../components/Card";

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
          bg="gray.200"
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
          <Box p="3">
            <FormSpy
              subscription={{ values: true }}
              onChange={({ values }) => {
                renderPdf(Object.keys(values?.content ?? {}).length.toString());
              }}
            />
            <Card>
              <Text textStyle="h2">Basic Info</Text>
              <AppInput name="content.name" label="Student Name" />
              <AppInput name="content.phone_number" label="Phone Number" />
              <AppInput name="content.linkedin_url" label="Linkedin URL" />
              <AppInput
                name="content.personal_website_url"
                label="Personal Website URL"
              />
              <Field
                name="meta.show_gpa"
                type="checkbox"
                render={({ input }) => (
                  <>
                    <Checkbox {...input}>Show GPA</Checkbox>
                    {input.checked && (
                      <AppNumberInput
                        name="content.gpa"
                        label="GPA"
                        precision={2}
                        defaultValue={4.0}
                        min={0}
                        max={4}
                        step={0.1}
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
                        <AppInput
                          name="content.high_school.name"
                          label="High School Name"
                        />
                      </>
                    )}
                  </>
                )}
              />
            </Card>
            <Card>
            <Text textStyle="h2">Education</Text>
              <AppInput name="content.name" label="Student Name" />
            </Card>
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
