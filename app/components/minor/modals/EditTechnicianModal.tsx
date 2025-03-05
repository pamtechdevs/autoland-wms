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
import {
  Technician,
  TechnicianFormData,
} from "../../../utils/types/technicians";
import { updateTechnician } from "../../../utils/services/technicians";

interface EditTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => Promise<void>; // Updated type to match refresh function
  technician: Technician | null;
}

export const EditTechnicianModal = ({
  isOpen,
  onClose,
  onUpdate,
  technician,
}: EditTechnicianModalProps) => {
  const toast = useToast();
  const [formData, setFormData] = useState<TechnicianFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    workshop: "",
    specialty: "",
    team: "",
    status: "On Duty",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (technician) {
      setFormData(technician);
    }
  }, [technician]);

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
      if (!technician?._id) throw new Error("No technician ID found");

      await updateTechnician(technician._id, formData);
      await onUpdate(); // Wait for refresh to complete
      toast({
        title: "Success",
        description: "Technician updated successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        title: "Error",
        description: "Failed to update technician",
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
          Update Technician
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody py={6} color="gray.800">
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" color="gray.600">
                Full Name
              </FormLabel>
              <StyledInput
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter technician's full name"
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
                _placeholder={{ color: "rgb(172, 175, 179)" }}
                color="black"
              />
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
                    value="Port-Harcourt">
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
                  Speciality
                </FormLabel>
                <StyledSelect
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  placeholder="Select speciality">
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="German">
                    German
                  </option>
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="Japanese">
                    Japanese
                  </option>
                  <option
                    style={{
                      backgroundColor: "#eee",
                      color: "gray.500",
                    }}
                    value="American">
                    American
                  </option>
                </StyledSelect>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="sm" color="gray.600">
                Team
              </FormLabel>
              <StyledSelect
                name="team"
                value={formData.team}
                onChange={handleInputChange}
                placeholder="Select team">
               <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Alpha">
              Team ALPHA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Beta">
              Team BETA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Delta">
              Team DELTA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Gamma">
              Team GAMMA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Omega">
              Team OMEGA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Omega">
              Team OMEGA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Omicron">
              Team OMICRON
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Sigma">
              Team SIGMA
            </option>
              </StyledSelect>
            </FormControl>

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
              isLoading={isUpdating}
              loadingText="Updating...">
              Update Technician
            </Button>
          </Stack>
        </ModalBody>
      </StyledModal>
    </Modal>
  );
};
