import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Stack,
  HStack,
  RadioGroup,
  Radio,
  Text,
  useToast,
  InputGroup, 
  InputRightElement, 
  IconButton
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { StaffFormData } from "@/app/utils/types/staff";
import { addStaff } from "@/app/utils/services/staff";
import {
  StyledInput,
  StyledModal,
  StyledSelect,
} from "../styling/technicians.styles";



interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  initialData: StaffFormData;
}

export const AddStaffModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: AddStaffModalProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState<StaffFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addStaff(formData);
      await onSuccess();
      toast({
        title: "Success",
        description: "Staff member added successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add staff member",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />
      <StyledModal>
        <ModalHeader
          color="gray.800"
          borderBottom="1px solid"
          borderColor="gray.400">
          Add New Staff Member
        </ModalHeader>
        <ModalCloseButton color="gray.800" />
        <ModalBody color="gray.800" py={6}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">
                Full Name
              </FormLabel>
              <StyledInput
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                _placeholder={{ color: "rgb(172, 175, 179)" }}
                color="black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">
                Phone Number
              </FormLabel>
              <StyledInput
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                _placeholder={{ color: "rgb(172, 175, 179)" }}
                color="black"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">
                Email
              </FormLabel>
              <StyledInput
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">
                Password
              </FormLabel>
              <InputGroup>
              
              
              <StyledInput
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                _placeholder={{ color: "rgb(172, 175, 179)" }}
                color="black"
              />
               <InputRightElement width="4.5rem">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  icon={
                    showPassword ? (
                      <FaEyeSlash color="black" />
                    ) : (
                      <FaEye color="black" />
                    )
                  }
                />
              </InputRightElement>
              </InputGroup>
            </FormControl>

            <HStack spacing={4}>
              <FormControl flex={1}>
                <FormLabel fontSize="sm" color="gray.600">
                  Workshop
                </FormLabel>
                <StyledSelect
                  name="workshop"
                  value={formData.workshop}
                  onChange={handleInputChange}
                  placeholder="Select workshop">
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="Port Harcourt">
                    Port-Harcourt
                  </option>
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="Owerri">
                    Owerri
                  </option>
                </StyledSelect>
              </FormControl>

              <FormControl flex={1}>
                <FormLabel fontSize="sm" color="gray.600">
                  Role
                </FormLabel>
                <StyledSelect
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Select role">
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="frontDesk">
                    Front Desk
                  </option>
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="accountant">
                    Accounts
                  </option>
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="autoclub">
                    Autoclub
                  </option>
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="workshopManager">
                    Manager
                  </option>
                </StyledSelect>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">
                Status
              </FormLabel>
              <RadioGroup
                value={formData.status}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }>
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

            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              width="full"
              size="sm"
              isLoading={isSubmitting}
              loadingText="Adding...">
              Add Staff Member
            </Button>
          </Stack>
        </ModalBody>
      </StyledModal>
    </Modal>
  );
};
