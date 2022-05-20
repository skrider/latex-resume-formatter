import { Box, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Field } from "react-final-form";

type AppInputProps = {
  label: string;
  name: string;
};

/**
 * This component abstracts away a Chakra themed text input connected to a
 * react-final-form instance
 */
const AppInput: React.FC<AppInputProps> = ({ label, name, ...props }) => {
  return (
    <Field
      name={name}
      type="input"
      render={({ input }) => (
        <Box {...props}>
          <Text>{label}</Text>
          <Input {...input} />
        </Box>
      )}
    />
  );
};

export default AppInput;
