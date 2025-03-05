import React from "react";
import {
  Input,
  Select,
  Textarea,
  VStack,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledInput = styled(Input)`
  background: rgb(255, 255, 255);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    background: white;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }

  &::placeholder {
    color: #a0aec0;
    font-size: 0.85rem;
  }
`;

export interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

export interface SelectFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string }>;
}

export interface TextAreaFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
  isReadOnly,
}) => (
  <StyledInput
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    isReadOnly={isReadOnly}
  />
);

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
  options,
}) => (
  <Select
    name={name}
    fontSize="sm"
    placeholder={placeholder}
    value={value}
    onChange={onChange}>
    {options.map((option) => (
      <option
        style={{
          backgroundColor: "white",
          color: "gray",
        }}
        key={option.value}
        value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => (
  <Textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    _placeholder={{ color: "#bdbdbd" }}
    bgColor="rgba(247, 250, 252, 0.8)"
    border="1px solid #e2e8f0"
    borderRadius="sm"
    p={4}
    fontSize="sm"
  />
);

export interface CheckboxGroupProps {
  options: Array<{ label: string; value: string }>;
  values?: { [key: string]: boolean };
  onChange?: (field: string, value: boolean) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  values = {},
  onChange = () => {},
}) => (
  <VStack align="stretch" spacing={2}>
    {options.map((option) => (
      <Checkbox
        key={option.value}
        isChecked={values[option.value] || false}
        onChange={(e) => onChange(option.value, e.target.checked)}
        sx={{
          "span.chakra-checkbox__control": {
            background: "gray.300",
            borderColor: "gray.300",
            _checked: {
              background: "blue.200",
              borderColor: "blue.700",
            },
            _hover: {
              background: "gray.200",
            },
          },
          "span.chakra-checkbox__label": {
            marginLeft: "2",
          },
        }}>
        <Text fontSize="sm">{option.label}</Text>
      </Checkbox>
    ))}
  </VStack>
);
