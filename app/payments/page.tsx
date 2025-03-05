"use client";
import {
  Box,
  Flex,
  Button,
  Grid,
  useDisclosure,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  Spinner,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  FaPlus,
  FaWallet,
  FaFileInvoice,
  FaChartLine,
  FaFilter,
  FaAngleLeft,
  FaAngleRight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styled from "@emotion/styled";

import Sidebar from "../components/major/SidebarMenu";
import MainContent from "../components/minor/MainContainer";
import Header from "../components/minor/HeaderNav";
import MetricCards from "../components/minor/MetricCards";
import { FaClipboardList, FaClock } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { DashboardMetrics } from "../utils/types/dashboardMetrics";
import { fetchDashboardMetrics } from "../utils/services/dashboardMetrics";
import { useAuth } from "../utils/services/context";
import { MetricCardData } from "../utils/types/metrics";
import {
  addExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "../utils/services/expenses";
import { Expense } from "../utils/types/expenses";
import { withAuth } from "../utils/services/ProtectecRoute";

const StyledModal = styled(ModalContent)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(249, 250, 251, 0.95)
  );
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #666;
`;

const StyledInput = styled(Textarea)`
  background: rgba(247, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  fontsize: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    background: white;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

const ExpenseCard = styled(Box)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

function PaymentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure(); // State for edit modal
  const { user } = useAuth();
  const toast = useToast();

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null); // State to hold metrics data
  const [expenses, setExpenses] = useState<Expense[]>([]); // State to hold expenses data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("fuel"); // Default category

  const [editExpense, setEditExpense] = useState<Expense | null>(null); // State to hold the expense being edited
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const fetchedMetrics = await fetchDashboardMetrics(); // Fetch metrics
        setMetrics(fetchedMetrics); // Update state with fetched data
      } catch (error) {
        console.error("Failed to load metrics:", error);
      }
    };

    loadMetrics();
  }, []);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await fetchExpenses(category, currentPage, 10); // Fetch expenses
        setExpenses(response.data.expenses); // Update state with fetched expenses
        setTotalPages(response.data.pagination.totalPages); // Update total pages
      } catch (error) {
        console.error("Failed to load expenses:", error);
      }
    };

    loadExpenses();
  }, [category, currentPage]); // Fetch expenses when category or currentPage changes

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: "",
    amount: 0,
    description: "",
    paymentMethod: "",
  });

  const dashboardMetrics: MetricCardData[] = [
    {
      title: "Total Income",
      value: `₦${metrics?.totalIncome || "₦0"}`,
      change: "+12.5%",
      isIncrease: true,
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, rgb(44, 31, 158), rgb(14, 10, 241))",
    },
    {
      title: "Total Outflow",
      value: `₦${metrics?.totalOutflow || "₦0"}`,
      change: "+8.2%",
      isIncrease: true,
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, blue.400, blue.600)",
    },

    {
      title: "Net Profit",
      value: `₦${metrics?.netProfit || "₦0"}`,
      change: "-2.3%",
      isIncrease: false,
      icon: FaClock,
      color: "orange.500",
      bgGradient: "linear(to-r, orange.800, orange.900)",
    },
    {
      title: "Total Expenses",
      value: `₦${metrics?.totalOutflow || "₦0"}`,
      change: "+8.2%",
      isIncrease: true,
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, rgb(4, 51, 112), rgb(6, 29, 105))",
    },
  ];

  const handleEditExpense = (expense: Expense) => {
    setEditExpense(expense);
    onEditOpen(); // Correct way to open the modal
  };
  const handleDeleteExpense = async (expense: Expense) => {
    try {
      await deleteExpense(expense.expenseId); // Call the delete function with expenseId
      const response = await fetchExpenses(category, currentPage, 10); // Refresh the expenses list after deleting
      setExpenses(response.data.expenses);
      setTotalPages(response.data.pagination.totalPages);
      toast({
        title: "Expense deleted.",
        status: "success",
        position: "top-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to delete expense:", error);
      toast({
        title: "Error deleting expense.",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handleUpdateExpense = async () => {
    if (!editExpense) return;

    setIsUpdating(true);
    try {
      await updateExpense(editExpense.expenseId, editExpense);
      const response = await fetchExpenses(category, currentPage, 10);
      setExpenses(response.data.expenses);
      setTotalPages(response.data.pagination.totalPages);
      onEditClose();
      toast({
        title: "Success",
        description: "Expense updated successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update expense",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddExpense = async () => {
    setIsSubmitting(true);
    try {
      const newExpenseData = {
        category: newExpense.category,
        description: newExpense.description,
        amount: newExpense.amount,
        paymentMethod: newExpense.paymentMethod,
      };

      await addExpense(newExpenseData);
      await fetchExpenses(category, currentPage, 10); // Refresh the list
      onClose();
      toast({
        title: "Success",
        description: "Expense added successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {user && metrics ? (
        <Flex>
          <Box display={{ base: "none", lg: "block" }}>
            <Sidebar />
          </Box>
          <MainContent>
            <Box flex="1" p={8}>
              <Header />
              <MetricCards metrics={dashboardMetrics} />

              {/* Quick Actions */}
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={6}
                mb={8}>
                <ExpenseCard>
                  <VStack align="stretch" spacing={4}>
                    <Icon as={FaWallet} color="blue.500" boxSize={6} />
                    <Text fontWeight="medium" fontSize="sm">
                      Quick Add Expense
                    </Text>
                    <Button
                      colorScheme="blue"
                      leftIcon={<FaPlus />}
                      size="sm"
                      onClick={onOpen}>
                      Add New Expense
                    </Button>
                  </VStack>
                </ExpenseCard>

                <ExpenseCard>
                  <VStack align="stretch" spacing={4}>
                    <Icon
                      as={FaFileInvoice}
                      fontSize="sm"
                      color="purple.500"
                      boxSize={6}
                    />
                    <Text fontWeight="medium" fontSize="sm">
                      Generate Report{" "}
                      <span style={{ color: "#777", fontSize: "12px" }}>
                        coming soon
                      </span>
                    </Text>
                    <Button colorScheme="purple" variant="outline" size="sm">
                      Download Report{" "}
                    </Button>
                  </VStack>
                </ExpenseCard>

                <ExpenseCard>
                  <VStack align="stretch" spacing={4}>
                    <Icon
                      as={FaChartLine}
                      fontSize="sm"
                      color="green.500"
                      boxSize={6}
                    />
                    <Text fontWeight="medium" fontSize="sm">
                      Analytics{" "}
                      <span style={{ color: "#777", fontSize: "12px" }}>
                        coming soon
                      </span>
                    </Text>
                    <Button colorScheme="green" variant="outline" size="sm">
                      View Analytics
                    </Button>
                  </VStack>
                </ExpenseCard>
              </Grid>

              {/* Expenses Table */}
              <Box bg="white" rounded="lg" shadow="sm" overflow="hidden">
                <Flex p={4} justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="bold">
                    Recent Expenses
                  </Text>
                  <HStack>
                    <Button leftIcon={<FaFilter />} size="sm" variant="ghost">
                      Filter
                    </Button>
                    <Select
                      placeholder="Category"
                      size="sm"
                      maxW="200px"
                      onChange={(e) => setCategory(e.target.value)}>
                      <option
                        style={{
                          backgroundColor: "#eee",
                          color: "gray.500",
                        }}
                        value="fuel">
                        Fuel
                      </option>
                      <option
                        style={{
                          backgroundColor: "#eee",
                          color: "gray.500",
                        }}
                        value="equipment">
                        Equipment
                      </option>
                      <option
                        style={{
                          backgroundColor: "#eee",
                          color: "gray.500",
                        }}
                        value="maintenance">
                        Maintenance
                      </option>
                      <option
                        style={{
                          backgroundColor: "#eee",
                          color: "gray.500",
                        }}
                        value="others">
                        Others
                      </option>
                    </Select>
                  </HStack>
                </Flex>

                <Table variant="simple">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th>ID</Th>
                      <Th>Category</Th>
                      <Th>Description</Th>
                      <Th isNumeric>Amount</Th>
                      <Th>Date</Th>
                      <Th>Payment Method</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {expenses.map((expense) => (
                      <Tr key={expense.expenseId}>
                        <Td fontWeight="medium">{expense.expenseId}</Td>
                        <Td>{expense.category}</Td>
                        <Td>{expense.description}</Td>
                        <Td isNumeric fontWeight="bold">
                          ₦{expense.amount}
                        </Td>
                        <Td>
                          {new Date(expense.createdAt).toLocaleDateString()}
                        </Td>
                        <Td>{expense.paymentMethod}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              size="sm"
                              colorScheme="blue"
                              aria-label="edit"
                              icon={<FaEdit />}
                              onClick={() => handleEditExpense(expense)} // Call edit function
                            />

                            <IconButton
                              size="sm"
                              aria-label="delete"
                              colorScheme="red"
                              icon={<FaTrash />}
                              onClick={() => handleDeleteExpense(expense)} // Call delete function
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

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
              </Box>

              {/* Add Expense Modal */}
              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay backdropFilter="blur(10px)" />
                <StyledModal>
                  <ModalHeader borderBottom="1px solid" borderColor="gray.300">
                    Add New Expense
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody py={6}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select
                          placeholder="Select category"
                          value={newExpense.category}
                          onChange={(e) =>
                            setNewExpense({
                              ...newExpense,
                              category: e.target.value,
                            })
                          }>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="fuel">
                            Fuel
                          </option>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="equipment">
                            Equipment
                          </option>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="maintenance">
                            Maintenance
                          </option>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="others">
                            Others
                          </option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <StyledInput
                          type="number"
                          placeholder="Enter amount"
                          value={newExpense.amount}
                          onChange={(e) =>
                            setNewExpense({
                              ...newExpense,
                              amount: Number(e.target.value),
                            })
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          background=" rgba(247, 250, 252, 0.8)"
                          border=" 1px solid #e2e8f0"
                          borderRadius="10px"
                          font-size="sm"
                          placeholder="Enter description"
                          value={newExpense.description}
                          onChange={(e) =>
                            setNewExpense({
                              ...newExpense,
                              description: e.target.value,
                            })
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Payment Method</FormLabel>
                        <Select
                          placeholder="Select payment method"
                          value={newExpense.paymentMethod}
                          onChange={(e) =>
                            setNewExpense({
                              ...newExpense,
                              paymentMethod: e.target.value,
                            })
                          }>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="Cash">
                            Cash
                          </option>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="Bank Transfer">
                            Bank Transfer
                          </option>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="Card Payment">
                            Card Payment
                          </option>
                          <option
                            style={{
                              backgroundColor: "#eee",
                              color: "gray.500",
                            }}
                            value="POS">
                            POS
                          </option>
                        </Select>
                      </FormControl>

                      <Button
                        colorScheme="blue"
                        size="sm"
                        width="full"
                        onClick={handleAddExpense}
                        isLoading={isSubmitting}
                        loadingText="Adding...">
                        Add Expense
                      </Button>
                    </VStack>
                  </ModalBody>
                </StyledModal>
              </Modal>

              {/* Edit Expense Modal */}
              <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
                <ModalOverlay backdropFilter="blur(10px)" />

                <ModalContent bgColor="gray.100" color="gray.800">
                  <ModalHeader borderBottom="1px solid" borderColor="gray.300">
                    Edit Expense
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody py={6}>
                    {editExpense && (
                      <VStack spacing={4}>
                        <FormControl>
                          <FormLabel>Category</FormLabel>
                          <Select
                            value={editExpense.category}
                            onChange={(e) =>
                              setEditExpense({
                                ...editExpense,
                                category: e.target.value,
                              })
                            }>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="fuel">
                              Fuel
                            </option>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="equipment">
                              Equipment
                            </option>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="maintenance">
                              Maintenance
                            </option>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="others">
                              Others
                            </option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <Textarea
                            background=" rgba(247, 250, 252, 0.8)"
                            border=" 1px solid #e2e8f0"
                            borderRadius="10px"
                            font-size="sm"
                            value={editExpense.description}
                            onChange={(e) =>
                              setEditExpense({
                                ...editExpense,
                                description: e.target.value,
                              })
                            }
                            placeholder="Enter description"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Amount</FormLabel>
                          <StyledInput
                            type="number"
                            value={editExpense.amount}
                            onChange={(e) =>
                              setEditExpense({
                                ...editExpense,
                                amount: Number(e.target.value),
                              })
                            }
                            placeholder="Enter amount"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Payment Method</FormLabel>
                          <Select
                            value={editExpense.paymentMethod}
                            onChange={(e) =>
                              setEditExpense({
                                ...editExpense,
                                paymentMethod: e.target.value,
                              })
                            }>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="Cash">
                              Cash
                            </option>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="Bank Transfer">
                              Bank Transfer
                            </option>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="Card Payment">
                              Card Payment
                            </option>
                            <option
                              style={{
                                backgroundColor: "#eee",
                                color: "gray.500",
                              }}
                              value="POS">
                              POS
                            </option>
                          </Select>
                        </FormControl>

                        <Button
                          colorScheme="blue"
                          size="sm"
                          width="full"
                          onClick={handleUpdateExpense}
                          isLoading={isUpdating}
                          loadingText="Updating...">
                          Update Expense
                        </Button>
                      </VStack>
                    )}
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </MainContent>
        </Flex>
      ) : (
        <Flex justify="center" align="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      )}
    </>
  );
}

export default withAuth(PaymentsPage, ["workshopManager", "accountant"]);
