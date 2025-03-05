"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  HStack,
  Divider,
  useToast,
  Icon,
  FormLabel,
  Grid,
  TableContainer,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FaUser, FaFileInvoice, FaPlus, FaTrash } from "react-icons/fa";
import { withAuth } from "@/app/utils/services/ProtectecRoute";
import { PageProps } from "@/app/utils/types/jobOrder";
import {
  updateEstimate,
  createEstimate,
  fetchEstimate,
} from "@/app/utils/services/estimate";

import { useAuth } from "@/app/utils/services/context";
import { StockistFormData } from "@/app/utils/types/stockist";

const StyledInput = styled(Input)`
  background: rgba(247, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  color: #2d3748;
  transition: all 0.3s ease;

  &:focus {
    background: white;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SectionTitle = styled(Heading)`
  font-size: 1rem;
  color: #2d3748;
  position: relative;
  margin: 1.5rem 0;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(180deg, #3182ce, #805ad5);
    border-radius: 4px;
  }
`;

function StockistPage({ params }: PageProps) {
  const { user } = useAuth();
  const jobId = params.id;
  const [estimateId, setEstimateId] = useState<string>("");
  const [formData, setFormData] = useState<StockistFormData>({
    jobOrderId: jobId,

    customerDetails: {
      customerName: "",
      regNo: "",
      vehicleMake: "",
      chassisNo: "",
      modelNo: "test",
      date: "",
      jobOrderNo: "",
      phoneNo: "",
      email: "",
    },
    partsAndServices: [],
    costSummary: {
      labour: 0,
      sundries: 0,
      vat: 0,
      estimator: "",
    },
  });

  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDetails = await fetchEstimate(jobId);

        setEstimateId(allDetails._id);
        setFormData((prev) => ({
          ...prev,
          // Always update customer details from job order
          customerDetails: allDetails.customerDetails,
          // Update parts and cost summary only if they exist
          ...(allDetails?.partsAndServices && {
            partsAndServices: allDetails.partsAndServices,
          }),
          ...(allDetails?.costSummary && {
            costSummary: allDetails.costSummary,
          }),
        }));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          status: "error",
          position: "top-right",
          duration: 5000,
        });
      }
    };

    if (jobId) {
      fetchData();
    }
  }, [jobId, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCostSummaryChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      costSummary: {
        ...prev.costSummary,
        [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
      },
    }));
  };

  const handleAddPart = () => {
    setFormData({
      ...formData,
      partsAndServices: [
        ...formData.partsAndServices,
        {
          partNo: "",
          partName: "",
          description: "",
          quantity: 0,
          unitPrice: 0,
          amount: 0,
        },
      ],
    });
  };

  const handlePartChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedParts = formData.partsAndServices.map((part, idx) => {
      if (idx === index) {
        // For numeric fields, convert value to a number
        let updatedValue: any = value;
        if (name === "quantity" || name === "unitPrice") {
          updatedValue = Number(value);
        }
        const updatedPart = { ...part, [name]: updatedValue };
        // Recalculate amount if quantity or unitPrice changes
        if (name === "quantity" || name === "unitPrice") {
          updatedPart.amount =
            Number(updatedPart.quantity) * Number(updatedPart.unitPrice);
        }
        return updatedPart;
      }
      return part;
    });
    setFormData({ ...formData, partsAndServices: updatedParts });
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await updateEstimate(estimateId, formData);

      toast({
        title: "Success",
        description: "Estimate updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update estimate",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateInvoice = async () => {
    setIsGenerating(true);
    try {
      // Send all required data
      const response = await createEstimate(jobId, {
        _id: estimateId || "",
        jobOrderId: {
          _id: jobId,
          jobOrderId: jobId,
        },
        customerDetails: {
          ...formData.customerDetails,
          date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
        },
        costSummary: {
          ...formData.costSummary,
          estimator: user?.name || formData.costSummary.estimator, // Use logged in user's name
        },
        partsAndServices: formData.partsAndServices,
      });

      // Update form with response data
      setFormData({
        ...formData,
        customerDetails: response.data.customerDetails,
        partsAndServices: response.data.partsAndServices,
        costSummary: response.data.costSummary,
        jobOrderId: jobId,
      });

      toast({
        title: "Success",
        description: "Estimate generated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate estimate",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Flex
      // padding={{ base: 2, md: 4, xl: 0 }}
      justifyContent="center"
      overflowX="scroll">
      <Box width="100%" flex={1}>
        <Box>
          <Flex align="center" mb={{ base: 4, md: 6 }} gap={2}>
            <Icon as={FaFileInvoice} fontSize="sm" color="blue.500" mr={3} />
            <Heading size="sm" color="gray.700">
              Stockist Form
            </Heading>
          </Flex>

          {/* Customer Information */}
          <Box mb={{ base: 6, md: 8 }}>
            <SectionTitle>
              <Icon as={FaUser} fontSize="sm" color="blue.500" />
              <Heading as="h3" size="xs">
                Customer Details
              </Heading>
            </SectionTitle>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 3, md: 4 }}>
              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Customer Name
                </FormLabel>
                <StyledInput
                  name="customerName"
                  placeholder="Enter customer name"
                  value={formData?.customerDetails.customerName}
                  onChange={handleInputChange}
                />
              </VStack>
              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Plate Number{" "}
                </FormLabel>
                <StyledInput
                  name="regNo"
                  placeholder="Enter registration number"
                  value={formData?.customerDetails.regNo}
                  onChange={handleInputChange}
                />
              </VStack>

              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Veh Make
                </FormLabel>
                <StyledInput
                  name="vehicleMake"
                  placeholder="Enter vehicle make"
                  value={formData?.customerDetails.vehicleMake}
                  onChange={handleInputChange}
                />
              </VStack>
              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Email
                </FormLabel>
                <StyledInput
                  name="email"
                  placeholder="Enter email"
                  value={formData?.customerDetails.email}
                  onChange={handleInputChange}
                />
              </VStack>
              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Chassis No
                </FormLabel>
                <StyledInput
                  name="chassisNo"
                  placeholder="Enter chassis number"
                  value={formData?.customerDetails.chassisNo}
                  onChange={handleInputChange}
                />
              </VStack>
              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Phone No
                </FormLabel>
                <StyledInput
                  name="phoneNo"
                  placeholder="Enter phone number"
                  value={formData?.customerDetails.phoneNo}
                  onChange={handleInputChange}
                />
              </VStack>

              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Job Order No
                </FormLabel>
                <StyledInput
                  name="jobOrderNo"
                  placeholder="Enter job order number"
                  value={formData?.customerDetails.jobOrderNo}
                  onChange={handleInputChange}
                />
              </VStack>
              <VStack align="stretch">
                <FormLabel color="gray.600" fontSize="sm">
                  Date
                </FormLabel>
                <StyledInput
                  name="date"
                  placeholder="Enter date"
                  value={formData?.customerDetails.date}
                  onChange={handleInputChange}
                />
              </VStack>
            </Grid>
          </Box>

          {/* Parts Table */}
          <Box mb={{ base: 6, md: 8 }}>
            <SectionTitle>
              <Icon as={FaFileInvoice} fontSize="sm" color="blue.500" />
              <Heading as="h3" size="xs">
                Parts & Services
              </Heading>
            </SectionTitle>
            <Box
              bg="white"
              overflowX="scroll"
              rounded="lg"
              shadow="sm"
              mx={{ base: -2, md: 0 }}>
              <TableContainer minW="1800px" overflowX="auto">
                <Table variant="simple" size={{ base: "sm", md: "md" }}>
                  <Thead bg="gray.50">
                    <Tr>
                      <Th color="gray.600">Part No.</Th>
                      <Th color="gray.600">Part Name</Th>
                      {!isMobile && <Th color="gray.600">Description</Th>}
                      <Th color="gray.600">Qty</Th>
                      <Th color="gray.600">Unit Price</Th>
                      <Th color="gray.600">Amount</Th>
                      <Th width="100px"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {formData?.partsAndServices.map((part, index) => (
                      <Tr key={index}>
                        <Td>
                          <StyledInput
                            name="partNo"
                            placeholder="Part no."
                            size={{ base: "sm", md: "md" }}
                            value={part.partNo}
                            onChange={(e) => handlePartChange(index, e)}
                          />
                        </Td>
                        <Td>
                          <StyledInput
                            name="partName"
                            placeholder="Part name"
                            size={{ base: "sm", md: "md" }}
                            value={part.partName}
                            onChange={(e) => handlePartChange(index, e)}
                          />
                        </Td>
                        {!isMobile && (
                          <Td>
                            <StyledInput
                              name="description"
                              placeholder="Description"
                              size={{ base: "sm", md: "md" }}
                              value={part.description}
                              onChange={(e) => handlePartChange(index, e)}
                            />
                          </Td>
                        )}
                        <Td>
                          <StyledInput
                            name="quantity"
                            placeholder="Qty"
                            size={{ base: "sm", md: "md" }}
                            value={part.quantity}
                            onChange={(e) => handlePartChange(index, e)}
                          />
                        </Td>
                        <Td>
                          <StyledInput
                            name="unitPrice"
                            placeholder="Price"
                            size={{ base: "sm", md: "md" }}
                            value={part.unitPrice}
                            onChange={(e) => handlePartChange(index, e)}
                          />
                        </Td>
                        <Td>
                          <StyledInput
                            name="amount"
                            placeholder="Amount"
                            size={{ base: "sm", md: "md" }}
                            value={part.amount}
                            readOnly
                          />
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="Remove part"
                            icon={<FaTrash />}
                            size={{ base: "xs", md: "sm" }}
                            colorScheme="red"
                            variant="ghost"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                partsAndServices:
                                  formData?.partsAndServices.filter(
                                    (_, i) => i !== index
                                  ),
                              })
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              size={{ base: "xs", md: "sm" }}
              variant="ghost"
              onClick={handleAddPart}
              mt={4}>
              Add Part
            </Button>
          </Box>

          {/* Summary Section */}
          <Box mb={{ base: 6, md: 8 }}>
            <SectionTitle size="xs">Cost Summary</SectionTitle>
            <VStack
              align="stretch"
              spacing={{ base: 3, md: 4 }}
              maxW={{ base: "100%", md: "400px" }}>
              <HStack justify="space-between">
                <Text color="gray.600">Labour:</Text>
                <StyledInput
                  w="200px"
                  placeholder="0.00"
                  type="number"
                  value={formData?.costSummary.labour}
                  onChange={(e) =>
                    handleCostSummaryChange("labour", e.target.value)
                  }
                />
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">Sundries:</Text>
                <StyledInput
                  w="200px"
                  placeholder="0.00"
                  value={formData?.costSummary.sundries}
                  onChange={(e) =>
                    handleCostSummaryChange("sundries", e.target.value)
                  }
                />
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">VAT:</Text>
                <StyledInput
                  w="200px"
                  placeholder="0.00"
                  value={formData?.costSummary.vat}
                  onChange={(e) =>
                    handleCostSummaryChange("vat", e.target.value)
                  }
                />
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">Estimator Name:</Text>
                <StyledInput
                  w="200px"
                  placeholder="Anozie Ikechi"
                  value={user?.name}
                  onChange={(e) =>
                    handleCostSummaryChange("estimator", e.target.value)
                  }
                />
              </HStack>
            </VStack>
          </Box>

          <Divider my={{ base: 4, md: 6 }} />

          <Flex
            justify="flex-start"
            gap={{ base: 2, md: 4 }}
            direction={{ base: "column", md: "row" }}
            wrap="wrap"
            mb={{ base: 6, md: 8 }}>
            <Button
              variant="outline"
              size={{ base: "xs", md: "sm" }}
              colorScheme="blue"
              w={{ base: "full", md: "auto" }}
              onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              size={{ base: "xs", md: "sm" }}
              onClick={handleGenerateInvoice}
              leftIcon={<FaFileInvoice />}
              w={{ base: "full", sm: "auto" }}
              isLoading={isGenerating}
              loadingText="Generating...">
              Generate Invoice
            </Button>
            <Button
              colorScheme="purple"
              size={{ base: "xs", md: "sm" }}
              onClick={handleSubmit}
              leftIcon={<FaFileInvoice />}
              w={{ base: "full", sm: "auto" }}
              isLoading={isSubmitting}
              loadingText="Updating...">
              Update Estimate
            </Button>
            {/* <Button
              colorScheme="teal"
              size={{ base: "xs", md: "sm" }}
              // onClick={handleSubmit}
              leftIcon={<FaFileInvoice />}
              w={{ base: "full", sm: "auto" }}>
              Download as PDF
            </Button> */}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
export default withAuth(StockistPage, ["workshopManager", "accountant"]);
