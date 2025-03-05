/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useDisclosure,
  Text,
  Badge,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
  HStack,
  IconButton,
  VStack,
  Collapse,
} from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import Sidebar from "@/app/components/major/SidebarMenu";
import MainContent from "@/app/components/minor/MainContainer";
import Header from "@/app/components/minor/HeaderNav";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CarDetail } from "@/app/utils/types/autoclub";
import { withAuth } from "@/app/utils/services/ProtectecRoute";
import { memberService } from "@/app/utils/services/member";
import { Member } from "@/app/utils/types/member";
import { EditServiceFrequencyModal } from "@/app/components/major/autoclub/EditServiceFrequencyModal";

const StyledModal = styled(ModalContent)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(249, 250, 251, 0.95)
  );
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

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

const StyledSelect = styled(Select)`
  background: rgba(247, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  height: 2.8rem;

  &:focus {
    background: white;
    border-color: #4299e1;
  }
`;

interface UserFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  subscription: string;
  status: string;
  servicesUsed: string;
  cars: CarDetail[];
}

// Add this type near other interface definitions
interface MemberWithQR extends Member {
  qrCode?: string;
}

const GridHeader = ({ children }: { children: React.ReactNode }) => (
  <Text
    fontSize="xs"
    fontWeight="semibold"
    color="gray.600"
    textTransform="uppercase"
    p={4}>
    {children}
  </Text>
);

function MembersPage() {
  const [searchTerm] = useState("");
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    subscription: "",
    servicesUsed: "",
    status: "Active",
    cars: [],
  });
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCar, setNewCar] = useState<CarDetail>({
    carModel: "",
    plateNumber: "",
  });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFrequency, setEditingFrequency] = useState<{
    memberId: string;
    currentFrequency: number;
  } | null>(null);

  const {
    isOpen: isFrequencyModalOpen,
    onOpen: onFrequencyModalOpen,
    onClose: onFrequencyModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await memberService.getAllMembers();

        setMembers(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to fetch members",
          status: "error",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [toast]);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (userId: string) => {
    try {
      await memberService.deleteMember(userId);

      // Update the local state by removing the deleted member
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== userId)
      );

      toast({
        title: "Member deleted",
        description: "Member has been removed successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete member",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleModalClose = () => {
    setIsEditMode(false);
    setEditingUser(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      subscription: "",
      servicesUsed: "",
      status: "Active",
      cars: [],
    });
    onModalClose();
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.subscription
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      // Prepare the data for API request
      const memberData = {
        fullName: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        subscriptionId: formData.subscription, // Assuming this is the subscription ID
        cars: formData.cars.map((car) => ({
          model: car.carModel,
          plateNumber: car.plateNumber,
        })),
      };

      if (isEditMode && editingUser) {
        // Update existing member logic will go here
        // We'll implement this in the next step
        toast({
          title: "Success",
          description: "Member updated successfully",
          status: "success",
          duration: 3000,
        });
      } else {
        // Add new member
        const response = await memberService.addMember(memberData);

        // Add the new member to the local state
        setMembers((prevMembers) => [...prevMembers, response.data]);

        toast({
          title: "Success",
          description: "New member added successfully",
          status: "success",
          duration: 3000,
        });
      }

      handleModalClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save member",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCar = () => {
    if (newCar.carModel && newCar.plateNumber) {
      setFormData((prev) => ({
        ...prev,
        cars: [...prev.cars, newCar],
      }));
      setNewCar({ carModel: "", plateNumber: "" });
    } else {
      toast({
        title: "Error",
        description: "Please fill in both car model and plate number",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleRemoveCar = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cars: prev.cars.filter((_, i) => i !== index),
    }));
  };

  const handleRowClick = (userId: string) => {
    setExpandedRow(expandedRow === userId ? null : userId);
  };

  // Replace the handleDownloadQR function with this implementation
  const handleDownloadQR = (member: MemberWithQR) => {
    if (!member.qrCode) {
      toast({
        title: "Error",
        description: "No QR code available for this member",
        position: "top-right",
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Create an anchor element
    const link = document.createElement("a");

    // Set the download filename
    link.download = `qr-code-${member.fullName.replace(/\s+/g, "-")}.png`;

    // Set the href to the base64 data
    link.href = member.qrCode;

    // Append to the document temporarily
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "QR Code downloaded successfully",
      status: "success",
      position: "top-right",
      duration: 3000,
    });
  };

  const handleEditFrequency = (memberId: string, currentFrequency: number) => {
    setEditingFrequency({ memberId, currentFrequency });
    onFrequencyModalOpen();
  };

  const handleUpdateFrequency = async (frequency: number) => {
    if (!editingFrequency) return;

    try {
      await memberService.updateMember(editingFrequency.memberId, {
        serviceFrequencyPerYear: frequency,
      });

      // Update the member in the local state
      setMembers((prev) =>
        prev.map((member) =>
          member._id === editingFrequency.memberId
            ? { ...member, serviceFrequencyPerYear: frequency }
            : member
        )
      );

      toast({
        title: "Success",
        description: "Service frequency updated successfully",
        status: "success",
        duration: 3000,
      });
      await memberService.getAllMembers();
      onFrequencyModalClose();
      setEditingFrequency(null);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update service frequency",
        status: "error",
        duration: 3000,
      });
    }
  };

  const filteredUsers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex>
      <Box>
        <Sidebar />
      </Box>
      <MainContent>
        <Box
          flex="1"
          p={{
            base: 2,
            md: 4,
            xl: 8,
          }}
          mt={{ base: 10, xl: 4 }}>
          <Header />
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="sm">AutoClub Members</Heading>
            <Flex>
              <Button
                colorScheme="blue"
                color="white"
                leftIcon={<FaPlus />}
                onClick={onModalOpen}
                size="sm">
                Add Member
              </Button>
            </Flex>
          </Flex>
          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            borderRadius="2xl"
            bg="white"
            boxShadow="md">
            <Box overflowX="auto">
              <Box minWidth="1200px">
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(8, 1fr)"
                  gap={4}
                  bg="gray.50"
                  borderRadius="lg"
                  mb={2}>
                  <GridHeader>Member Name</GridHeader>
                  <GridHeader>Phone</GridHeader>
                  <GridHeader>Email</GridHeader>
                  <GridHeader>Cars</GridHeader>
                  <GridHeader>Subscription</GridHeader>
                  <GridHeader>Services Used</GridHeader>
                  <GridHeader>Status</GridHeader>
                  <GridHeader>Actions</GridHeader>
                </Box>

                <VStack spacing={2} align="stretch">
                  {filteredUsers.map((user) => (
                    <Box key={user._id}>
                      <Box
                        display="grid"
                        gridTemplateColumns="repeat(8, 1fr)"
                        gap={4}
                        p={4}
                        bg="white"
                        borderRadius="lg"
                        onClick={() => handleRowClick(user._id)}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "sm",
                          bg: "gray.50",
                        }}
                        transition="all 0.2s"
                        cursor="pointer">
                        <Flex align="center">
                          <Text fontWeight="medium">{user.fullName}</Text>
                        </Flex>

                        <Flex align="center">
                          <Text>{user.phoneNumber}</Text>
                        </Flex>

                        <Flex align="center">
                          <Text color="gray.600" fontSize="sm">
                            {user.email}
                          </Text>
                        </Flex>

                        <Flex align="center">
                          <Badge
                            colorScheme="blue"
                            variant="solid"
                            px={3}
                            py={1}
                            borderRadius="full">
                            {user.cars?.length || 0} Cars
                          </Badge>
                        </Flex>

                        <Flex align="center">
                          <Badge
                            colorScheme={
                              user.subscription?.tier === "Platinum" ||
                              user.membershipPackage === "Platinum"
                                ? "purple"
                                : user.subscription?.tier === "Gold" ||
                                  user.membershipPackage === "Gold"
                                ? "yellow"
                                : "gray"
                            }
                            variant="solid"
                            px={3}
                            py={1}
                            borderRadius="full">
                            {user.subscription?.tier ||
                              user.membershipPackage ||
                              "No Subscription"}
                          </Badge>
                        </Flex>

                        <Flex align="center">
                          <Text color="gray.600" fontSize="sm">
                            {user.serviceFrequencyPerYear || "N/A"}
                          </Text>
                        </Flex>

                        <Flex align="center">
                          <Badge
                            colorScheme={
                              user.status === "Active" ? "green" : "red"
                            }
                            variant="solid"
                            px={3}
                            py={1}
                            borderRadius="full">
                            {user.status}
                          </Badge>
                        </Flex>

                        <Flex alignItems="center" gap={2}>
                          <IconButton
                            aria-label="Delete member"
                            icon={<FaTrash />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user._id);
                            }}
                          />
                          <IconButton
                            aria-label="Download member QR Code"
                            icon={<FaDownload />}
                            size="sm"
                            colorScheme="teal"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadQR(user);
                            }}
                            alignSelf="flex-end"
                            w={{ base: "full", sm: "auto" }}
                          />
                          <IconButton
                            icon={<FaEdit />}
                            aria-label="Edit service frequency"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() =>
                              handleEditFrequency(
                                user._id,
                                user.serviceFrequencyPerYear
                              )
                            }
                          />
                        </Flex>
                      </Box>
                      <Collapse in={expandedRow === user._id}>
                        <Box
                          ml={4}
                          p={4}
                          bg="gray.50"
                          borderRadius="lg"
                          mt={2}
                          border="1px dashed"
                          borderColor="gray.200">
                          <VStack align="stretch" spacing={4}>
                            <Box>
                              <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="gray.700"
                                mb={3}>
                                Registered Vehicles ({user.cars?.length || 0})
                              </Text>
                              {user.cars && user.cars.length > 0 ? (
                                <VStack align="stretch" spacing={2}>
                                  {user.cars.map((car, idx) => (
                                    <HStack
                                      key={idx}
                                      justify="space-between"
                                      bg="white"
                                      p={3}
                                      borderRadius="md"
                                      boxShadow="sm">
                                      <HStack spacing={4}>
                                        <Text fontSize="sm" fontWeight="medium">
                                          {car.model}
                                        </Text>
                                        <Badge
                                          variant="solid"
                                          colorScheme="blue"
                                          fontSize="xs">
                                          {car.plateNumber}
                                        </Badge>
                                      </HStack>
                                      <Badge
                                        colorScheme="green"
                                        variant="solid"
                                        px={2}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="xs">
                                        Active
                                      </Badge>
                                    </HStack>
                                  ))}
                                </VStack>
                              ) : (
                                <Text fontSize="sm" color="gray.500">
                                  No vehicles registered
                                </Text>
                              )}
                            </Box>
                          </VStack>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Box>
          </Box>
        </Box>
      </MainContent>
      {/* Add Technician Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />
        <StyledModal>
          <ModalHeader
            borderBottom="1px solid"
            borderColor="gray.100"
            py={4}
            fontSize="lg"
            color="gray.700">
            {isEditMode ? "Edit Member" : "Add New Member"}
          </ModalHeader>
          <ModalCloseButton color="gray.800" />
          <ModalBody py={6}>
            <Stack spacing={6}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.600">
                  Full Name
                </FormLabel>
                <StyledInput
                  name="name"
                  value={formData.name}
                  _placeholder={{ color: "#666" }}
                  color="gray.800"
                  onChange={handleInputChange}
                  placeholder="Enter user's full name"
                  //   _placeholder={{ color: "gray.400" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.600">
                  Phone Number
                </FormLabel>
                <StyledInput
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  _placeholder={{ color: "#666" }}
                  color="gray.800"
                  placeholder="Enter phone number"
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
                  _placeholder={{ color: "#666" }}
                  color="gray.800"
                  placeholder="Enter email address"
                />
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.600">
                  Password
                </FormLabel>
                <StyledInput
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                />
              </FormControl> */}
              <FormControl>
                <FormLabel fontSize="sm" color="gray.600">
                  Subscription
                </FormLabel>
                <StyledSelect
                  color="gray.800"
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleInputChange}
                  placeholder="Select subscription">
                  <option
                    style={{ backgroundColor: "#fdfdfd" }}
                    value="Plantinum">
                    Platinum
                  </option>
                  <option style={{ backgroundColor: "#fdfdfd" }} value="Gold">
                    Gold
                  </option>
                  <option style={{ backgroundColor: "#fdfdfd" }} value="Silver">
                    Silver
                  </option>
                  <option
                    style={{ backgroundColor: "#fdfdfd" }}
                    value="Diamond">
                    Diamond
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
                    <Radio
                      value="Active"
                      colorScheme="blue"
                      color="gray.800"
                      sx={{
                        "span.chakra-radio__control": {
                          borderColor: "yellow",
                          _checked: {
                            bg: "blue.500",
                            borderColor: "blue.500",
                          },
                        },
                      }}>
                      <Text fontSize="sm" color="gray.800">
                        Active
                      </Text>
                    </Radio>
                    <Radio
                      value="inactive"
                      colorScheme="red"
                      color="gray.800"
                      sx={{
                        "span.chakra-radio__control": {
                          borderColor: "gray.300",
                          _checked: {
                            bg: "red.500",
                            borderColor: "red.500",
                          },
                        },
                      }}>
                      <Text fontSize="sm" color="gray.800">
                        Inactive
                      </Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              {/* Add Car Section */}
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <FormControl mb={4} color="gray.800">
                  <FormLabel fontSize="sm" color="gray.600">
                    {`   Add Member's Cars`}
                  </FormLabel>
                  <Stack spacing={4}>
                    <Flex gap={4} flexDir="column">
                      <HStack>
                        <StyledInput
                          placeholder="Car Model (e.g., Toyota Camry)"
                          _placeholder={{ color: "#666" }}
                          color="gray.800"
                          value={newCar.carModel}
                          onChange={(e) =>
                            setNewCar((prev: any) => ({
                              ...prev,
                              carModel: e.target.value,
                            }))
                          }
                        />
                        <StyledInput
                          placeholder="Plate Number"
                          value={newCar.plateNumber}
                          onChange={(e) =>
                            setNewCar((prev: any) => ({
                              ...prev,
                              plateNumber: e.target.value,
                            }))
                          }
                        />
                      </HStack>
                      <Button
                        colorScheme="blue"
                        onClick={handleAddCar}
                        size="sm"
                        width="fit-content"
                        leftIcon={<FaPlus />}>
                        Add
                      </Button>
                    </Flex>
                    {/* Display added cars */}
                    {formData.cars.map((car, index) => (
                      <HStack
                        key={index}
                        justify="space-between"
                        bg="gray.50"
                        p={2}
                        borderRadius="md">
                        <Text fontSize="sm">
                          {car.carModel} - {car.plateNumber}
                        </Text>
                        <IconButton
                          aria-label="Remove car"
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemoveCar(index)}
                        />
                      </HStack>
                    ))}
                  </Stack>
                </FormControl>
              </Box>
              <Button
                colorScheme="blue"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
                size="sm"
                fontSize="sm"
                isLoading={isLoading}
                onClick={handleSubmit}
                width="full">
                {isEditMode ? "Update User" : "Add User"}
              </Button>
            </Stack>
          </ModalBody>
        </StyledModal>
      </Modal>
      {editingFrequency && (
        <EditServiceFrequencyModal
          isOpen={isFrequencyModalOpen}
          onClose={() => {
            onFrequencyModalClose();
            setEditingFrequency(null);
          }}
          currentFrequency={editingFrequency.currentFrequency}
          onSubmit={handleUpdateFrequency}
        />
      )}
    </Flex>
  );
}
export default withAuth(MembersPage, ["workshopManager", "autoclub"]);
