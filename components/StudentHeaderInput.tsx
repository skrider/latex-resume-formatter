import React from "react";
import { Field } from "react-final-form";
import {
  Input,
  Box,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
} from "@chakra-ui/react";

const StudentHeaderInput: React.FC = () => {
  return (
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
  );
};

export default StudentHeaderInput;
