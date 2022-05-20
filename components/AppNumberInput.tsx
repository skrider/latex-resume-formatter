import React from "react";
import {
  Box,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Field } from "react-final-form";

type AppNumberInputProps = {
  name: string;
  label: string;
  precision: number;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
};

const AppNumberInput: React.FC<AppNumberInputProps> = ({
  name,
  label,
  precision,
  defaultValue,
  min,
  max,
  step,
}) => {
  return (
    <Field
      name="content.gpa"
      type="number"
      render={({ input }) => (
        <Box>
          <Text>{label}</Text>
          <NumberInput
            {...input}
            name={name}
            precision={precision}
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      )}
    />
  );
};

export default AppNumberInput;
