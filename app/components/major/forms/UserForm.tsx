import { UserFormData } from "@/app/utils/types/user";
import {
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
  Text,
  Input,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

interface UserFormProps {
  formData: UserFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onStatusChange: (value: string) => void;
}
const StyledInput = styled(Input)`
  background: rgba(247, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  &::placeholder {
    color: #b9bdc2;
  }
  &:focus {
    background: white;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;
export const UserForm = ({
  formData,
  onChange,
  onStatusChange,
}: UserFormProps) => {
  return (
    <Stack spacing={6}>
      <FormControl isRequired>
        <FormLabel fontSize="sm" color="gray.600">
          Full Name
        </FormLabel>
        <StyledInput
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Enter user's full name"
        />
      </FormControl>

      {/* Other form fields... */}

      <FormControl>
        <FormLabel fontSize="sm" color="gray.600">
          Status
        </FormLabel>
        <RadioGroup value={formData.status} onChange={onStatusChange}>
          <Stack direction="row" spacing={4}>
            <Radio value="On Duty" colorScheme="blue">
              <Text fontSize="sm">On Duty</Text>
            </Radio>
            <Radio value="On Leave" colorScheme="red">
              <Text fontSize="sm">On Leave</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
