"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text,
  Badge,
  useToast,
  Avatar,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import styled from "@emotion/styled";
import Sidebar from "@/app/components/major/SidebarMenu";
import MainContent from "@/app/components/minor/MainContainer";
import Header from "@/app/components/minor/HeaderNav";
// import { useRouter } from "next/navigation";
import { withAuth } from "../utils/services/ProtectecRoute";
import {
  fetchCustomerDetails,
  fetchCustomers,
} from "../utils/services/customers";
import { Customer } from "../utils/types/customer";

const StyledTable = styled(Table)`
  th {
    background: #f7fafc;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  tr {
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background: #eee;
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  }

  td {
    font-size: 0.875rem;
  }
`;

function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [, setSelectedVehicle] = useState("");
  // const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetchCustomers(currentPage, 10);
        setCustomers(response.data.customers);

        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        toast({
          title: "Error loading customers.",
          status: "error",
          duration: 3000,
        });
      }
    };

    loadCustomers();
  }, [currentPage, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleRowClick = async (customer: Customer) => {
  //   setSelectedCustomer(customer);

  //   try {
  //     const response = await fetchCustomerDetails(customer.id); // Fetch customer details
  //     const customerDetails = response.data.customerDetails; // Extract customer details
  //     const vehicles = response.data.vehicles; // Extract vehicles
  //     const serviceHistory = response.data.serviceHistory; // Extract service history

  //     // Update selectedCustomer with detailed information
  //     setSelectedCustomer({
  //       ...customer,
  //       ...customerDetails,
  //       vehicles: vehicles,
  //       serviceHistory: serviceHistory,
  //     });
  //   } catch (error) {
  //     console.error("Failed to load customer details:", error);
  //     toast({
  //       title: "Error loading customer details.",
  //       status: "error",
  //       duration: 3000,
  //     });
  //   }
  //   onOpen(); // Open the drawer
  // };

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

          {/* Search and Title Section */}
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="sm" color="gray.700">
              Customers
            </Heading>
          </Flex>

          {/* Customers Table */}
          <Box
            overflowX="auto"
            shadow="sm"
            rounded="lg"
            bg="white"
            css={{
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#cbd5e0",
                borderRadius: "4px",
                "&:hover": {
                  background: "#a0aec0",
                },
              },
            }}>
            <Box minW="1600px">
              <StyledTable>
                <Thead>
                  <Tr>
                    <Th color="gray.600">Customer</Th>
                    <Th color="gray.600">Contact</Th>
                    <Th color="gray.600">Plate Number</Th>
                    <Th color="gray.600">Vehicles</Th>
                    {/* <Th color="gray.600">Outstanding</Th> */}
                    <Th color="gray.600">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customers.map((customer, index) => (
                    <Tr key={index}>
                      <Td>
                        <HStack>
                          <Avatar size="sm" name={customer.fullName} />
                          <Box>
                            <Text fontWeight="medium">{customer.fullName}</Text>
                            <Text
                              fontSize="xs"
                              fontWeight="semibold"
                              color="gray.600">
                              {customer.email}
                            </Text>
                          </Box>
                        </HStack>
                      </Td>
                      <Td>{customer.phoneNumber}</Td>
                      <Td>{customer.plateNumber}</Td>
                      <Td>
                        <Badge
                          variant="solid"
                          colorScheme="blue"
                          borderRadius="full">
                          {customer.totalVehicles} vehicles
                        </Badge>
                      </Td>
                      {/* <Td>
                        <Text
                          color={
                            customer.outstandingPayment > 0
                              ? "red.500"
                              : "green.500"
                          }>
                          ${customer.outstandingPayment}
                        </Text>
                      </Td> */}
                      <Td>
                        <Badge
                          variant="solid"
                          colorScheme={
                            customer.outstandingPayment > 0 ? "red" : "green"
                          }
                          borderRadius="full">
                          {customer.currentJobOrderStatus}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </StyledTable>
            </Box>
          </Box>

          {/* Pagination Controls */}
          <HStack spacing={4} mt={4}>
            <IconButton
              colorScheme="blue"
              aria-label="previous"
              icon={<FaAngleLeft color="#002050" />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
            />
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <IconButton
              colorScheme="blue"
              aria-label="next"
              icon={<FaAngleRight color="#002050" />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
            />
          </HStack>

          {/* Customer Details Drawer */}
          {/* <Drawer isOpen={isOpen} onClose={onClose} size="md">
            <DrawerOverlay />
            <DrawerContent bgColor="gray.100" color="gray.600">
              <DrawerCloseButton />
              <DrawerHeader
                fontSize="medium"
                fontWeight="extrabold"
                borderBottomWidth="1px">
                Customer Details
              </DrawerHeader>
              <DrawerBody> */}
          {/* {selectedCustomer && (
                  <VStack spacing={6} align="stretch"> */}
          {/* Customer Info Section */}
          {/* <Box>
                      <Heading size="xz" mb={4}>
                        Personal Information
                      </Heading>
                      <VStack align="stretch" spacing={3} color="gray.700">
                        <HStack>
                          <Icon as={FaUser} color="blue.500" />
                          <Text>{selectedCustomer.fullName}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaEnvelope} color="blue.500" />
                          <Text>{selectedCustomer.email}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaPhone} color="blue.500" />
                          <Text>{selectedCustomer.phoneNumber}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaDollarSign} color="blue.500" />
                          <Text>
                            Outstanding: ${selectedCustomer.outstandingPayment}
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaCakeCandles} color="blue.500" />
                          <Text>
                            Birthdate:{" "}
                            {new Date(
                              selectedCustomer.birthDate
                            ).toLocaleDateString()}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>

                    <Divider /> */}

          {/* Vehicles Section */}
          {/* <Box>
                      <Heading size="xs" mb={4}>
                        Vehicles
                      </Heading>
                      <Select
                        size="sm"
                        placeholder="Select vehicle for job order"
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        mb={4}>
                        {selectedCustomer.vehicles?.map((vehicle, idx) => (
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                              fontSize: "14px",
                            }}
                            key={idx}
                            value={vehicle.name}>
                            {vehicle.name} ({vehicle.year})
                          </option>
                        ))}
                      </Select>

                      <Text fontSize="sm" color="gray.600" mb={2}>
                        Service History
                      </Text>
                      <VStack align="stretch" spacing={2}>
                        {selectedCustomer.serviceHistory?.map((history) => (
                          <Box
                            key={history.jobOrderId}
                            p={2}
                            bg="white"
                            borderRadius="md"
                            fontSize="sm">
                            <HStack justify="space-between">
                              <Text>Job Order ID: {history.jobOrderId}</Text>
                              <Text color="gray.600">
                                {new Date(history.date).toLocaleDateString()}
                              </Text>
                            </HStack>
                            <Text color="blue.500" fontWeight="medium">
                              {history.serviceRendered}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  </VStack>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer> */}
        </Box>
      </MainContent>
    </Flex>
  );
}

export default withAuth(CustomersPage, ["workshopManager", "frontDesk"]);
