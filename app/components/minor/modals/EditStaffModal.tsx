import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import {
  StyledModal,
  StyledInput,
  StyledSelect,
} from "../styling/technicians.styles";
import { Staff, StaffFormData } from "../../../utils/types/staff";
import { updateStaff } from "../../../utils/services/staff";

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => Promise<void>;
  staff: Staff | null;
}

export const EditStaffModal = ({
  isOpen,
  onClose,
  onUpdate,
  staff,
}: EditStaffModalProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState<StaffFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    workshop: "",
    role: "",
    status: "On Duty",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    }
  }, [staff]);
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
    if (!formData.fullName || !formData.phoneNumber || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    setIsUpdating(true);
    try {
      if (!staff?._id) throw new Error("No staff ID found");

      await updateStaff(staff._id, formData);
      await onUpdate(); // Wait for refresh to complete
      toast({
        title: "Success",
        description: "Staff updated successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        title: "Error",
        description: "Failed to update staff",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsUpdating(false);
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
          Edit Staff
        </ModalHeader>
        <ModalCloseButton color="gray.800" />
        <ModalBody color="gray.800" py={6}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.600">Full Name</FormLabel>
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
              <FormLabel color="gray.600">Phone Number</FormLabel>
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
              <FormLabel color="gray.600">Email</FormLabel>
              <StyledInput
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </FormControl>

            {/* <FormControl isRequired>
              <FormLabel color="gray.600">Password</FormLabel>
              <StyledInput
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                _placeholder={{ color: "rgb(172, 175, 179)" }}
                color="black"
              />
            </FormControl> */}

            <HStack spacing={4}>
              <FormControl flex={1}>
                <FormLabel color="gray.600">Workshop</FormLabel>
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
                <FormLabel color="gray.600">Role</FormLabel>
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
              <FormLabel color="gray.600">Status</FormLabel>
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
              isLoading={isUpdating}
              loadingText="Updating...">
              Update Staff
            </Button>
          </Stack>
        </ModalBody>
      </StyledModal>
    </Modal>
  );
};
