"use client";
import Sidebar from "@/app/components/major/SidebarMenu";
import Header from "@/app/components/minor/HeaderNav";
import MetricCards from "@/app/components/minor/MetricCards";
import { MetricCardData } from "@/app/utils/types/metrics";
import {
  Box,
  Flex,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  ModalFooter,
  Divider,
  Grid,
  GridItem,
  InputGroup,
  InputLeftAddon,
  Badge,
  Stack,
  TableContainer,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { FaCheckCircle, FaClipboardList, FaEdit } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { withAuth } from "@/app/utils/services/ProtectecRoute";
import {
  PaymentMetrics,
  PaymentHistory,
  PaymentRequest,
} from "@/app/utils/types/account";
import {
  addPayment,
  getPaymentHistory,
  getPaymentSummary,
  updatePayment,
} from "@/app/utils/services/account";

function CustomerJobOrderAccount({ params }: { params: { id: string } }) {
  const jobId = params.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Initialize metrics with default values
  const [metrics, setMetrics] = useState<PaymentMetrics>({
    jobOrderId: jobId,
    totalJobAmount: 0,
    previouslyPaid: 0,
    remainingBalance: 0,
  });

  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [editable, setEditable] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentHistory | null>(
    null
  );
  // Form state
  const [paymentForm, setPaymentForm] = useState<PaymentRequest>({
    jobOrderId: jobId,
    amount: 0,
    totalAmountDue: 0,
    paymentPhase: "",
    paymentMethod: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchPaymentData = async () => {
    try {
      const [summary, history] = await Promise.all([
        getPaymentSummary(params.id),
        getPaymentHistory(params.id),
      ]);

      // Set metrics with fallback values if data is missing
      setMetrics({
        jobOrderId: params.id,
        totalJobAmount: summary?.totalJobAmount,
        previouslyPaid: summary?.previouslyPaid,
        remainingBalance: summary?.remainingBalance,
      });

      // Set payments with empty array fallback
      setPayments(history || []);

      // Update payment form with total amount
      setPaymentForm((prev) => ({
        ...prev,
        totalAmountDue: summary?.totalJobAmount,
      }));
    } catch (error) {
      // In case of error, keep the default values
      toast({
        title: "Note",
        description: "No payment records found",
        status: "info",
        duration: 3000,
      });
    }
  };

  const handleSubmitPayment = async () => {
    setIsSubmitting(true);
    try {
      await addPayment(paymentForm);
      await fetchPaymentData();
      onClose();
      toast({
        title: "Success",
        description: "Payment recorded successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record payment",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPayment = async () => {
    setIsUpdating(true);

    if (!selectedPayment?._id) {
      toast({
        title: "Error",
        description: "No payment selected for update",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      await updatePayment(selectedPayment._id, {
        amount: Number(paymentForm.amount),
        paymentPhase: paymentForm.paymentPhase,
        paymentMethod: paymentForm.paymentMethod,
        totalAmountDue: Number(paymentForm.totalAmountDue),
      });

      await fetchPaymentData();
      onEditClose();
      toast({
        title: "Success",
        description: "Payment updated successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Use effect to fetch initial data
  useEffect(() => {
    fetchPaymentData();
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update dashboard metrics to use safe values
  const dashboardMetrics: MetricCardData[] = [
    {
      title: "Total Job Amount",
      value: `₦${metrics.totalJobAmount.toLocaleString()}`,
      change: "100%",
      isIncrease: true,
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, purple.400, purple.600)",
    },
    {
      title: "Total Paid",
      value: `₦${metrics.previouslyPaid.toLocaleString()}`,
      change: `${(
        (metrics.previouslyPaid / (metrics.totalJobAmount || 1)) *
        100
      ).toFixed(1)}%`,
      isIncrease: true,
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, blue.400, blue.600)",
    },
    {
      title: "Balance",
      value: `₦${metrics.remainingBalance.toLocaleString()}`,
      change: `${(
        (metrics.remainingBalance / (metrics.totalJobAmount || 1)) *
        100
      ).toFixed(1)}%`,
      isIncrease: false,
      icon: FaCheckCircle,
      color: "green.500",
      bgGradient: "linear(to-r, green.400, green.600)",
    },
    {
      title: "Total Job Amount",
      value: `₦${metrics.totalJobAmount.toLocaleString()}`,
      change: "100%",
      isIncrease: true,
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, purple.400, purple.600)",
    },
  ];

  return (
    <Flex width="100%" padding={0}>
      <Box>
        <Sidebar />
      </Box>

      <Box
        flex={1}
        p={{
          base: 2,
          md: 4,
          xl: 0,
        }}
        mt={{ base: 10, xl: 4 }}
        width="100%">
        <Header />
        <MetricCards metrics={dashboardMetrics} />

        <VStack
          spacing={{ base: 4, md: 6 }}
          align="stretch"
          mt={{ base: 6, md: 8 }}>
          <Flex
            justify="space-between"
            align="center"
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 2 }}
            wrap="wrap">
            <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
              Payment History
            </Text>
            <Button
              size={{ base: "xs", md: "sm" }}
              colorScheme="blue"
              onClick={onOpen}
              w={{ base: "full", sm: "auto" }}>
              Record New Payment
            </Button>
          </Flex>

          <Box
            bg="white"
            rounded="lg"
            shadow="sm"
            overflow="hidden"
            mx={{ base: -2, md: 0 }}>
            <TableContainer overflowX="auto">
              <Table variant="simple" size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    {!isMobile && <Th>Payment Phase</Th>}
                    <Th>Date</Th>
                    <Th isNumeric>Amount</Th>
                    {!isMobile && <Th>Payment Method</Th>}
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <Tr key={payment._id}>
                        {!isMobile && <Td>{payment.paymentPhase}</Td>}
                        <Td>{new Date(payment.date).toLocaleDateString()}</Td>
                        <Td isNumeric>₦{payment.amount.toLocaleString()}</Td>
                        {!isMobile && <Td>{payment.paymentMethod}</Td>}
                        <Td>
                          <IconButton
                            aria-label="Edit payment"
                            icon={<FaEdit />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setPaymentForm({
                                jobOrderId: payment.jobOrderId,
                                amount: payment.amount,
                                paymentPhase: payment.paymentPhase,
                                paymentMethod: payment.paymentMethod,
                                totalAmountDue: metrics.totalJobAmount,
                              });
                              onEditOpen();
                            }}
                          />
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={isMobile ? 2 : 4} textAlign="center">
                        No payment records found
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Box>

      {/* Payment Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottom="1px solid"
            borderColor="gray.200"
            fontSize={{ base: "md", md: "lg" }}
            py={{ base: 3, md: 4 }}
            mb={8}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "start", sm: "center" }}
              spacing={{ base: 2, sm: 0 }}>
              <Text fontSize={{ base: "sm", md: "md" }}>
                {" "}
                Record New Payment
              </Text>
              <Badge
                colorScheme={
                  metrics?.remainingBalance === 0 ? "green" : "orange"
                }
                fontSize={{ base: "2xs", md: "sm" }}
                px={2}
                py={1}
                borderRadius="full">
                Balance: ₦{metrics?.remainingBalance.toLocaleString()}
              </Badge>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={{ base: 4, md: 6 }}>
            <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 3, md: 4 }}>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel fontSize={{ base: "xs", md: "sm" }}>
                    Payment Phase
                  </FormLabel>
                  <Select
                    name="paymentPhase"
                    value={paymentForm.paymentPhase}
                    onChange={handleInputChange}
                    placeholder="Select phase"
                    size={{ base: "sm", md: "md" }}>
                    <option value="First">First Payment (Initial)</option>
                    <option value="Second">Second Payment (Interim)</option>
                    <option value="Third">Third Payment (Progress)</option>
                    <option value="Final">Final Payment (Completion)</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <Flex justify="space-between" align="center" mb={1}>
                    <FormLabel fontSize={{ base: "xs", md: "sm" }} mb={0}>
                      Total Amount Due
                    </FormLabel>
                    <IconButton
                      aria-label="Edit total amount"
                      icon={<FaEdit />}
                      size={{ base: "xs", md: "sm" }}
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => {
                        // Add your edit logic here
                        setEditable(!editable);
                      }}
                    />
                  </Flex>
                  <InputGroup size={{ base: "sm", md: "md" }}>
                    <InputLeftAddon>₦</InputLeftAddon>
                    <Input
                      name="totalAmountDue"
                      type="number"
                      value={paymentForm.totalAmountDue}
                      onChange={handleInputChange}
                      placeholder="Enter total amount due"
                      isReadOnly={editable}
                    />
                  </InputGroup>
                  <Text
                    fontSize={{ base: "2xs", md: "sm" }}
                    color="gray.300"
                    mt={1}>
                    Maximum allowed: ₦
                    {metrics?.remainingBalance.toLocaleString()}
                  </Text>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel fontSize={{ base: "xs", md: "sm" }}>
                    Amount Paid
                  </FormLabel>
                  <InputGroup size={{ base: "sm", md: "md" }}>
                    <InputLeftAddon>₦</InputLeftAddon>
                    <Input
                      name="amount"
                      type="number"
                      value={paymentForm.amount}
                      onChange={handleInputChange}
                      placeholder="Enter payment amount"
                      max={metrics?.remainingBalance}
                    />
                  </InputGroup>
                  <Text
                    fontSize={{ base: "2xs", md: "sm" }}
                    color="gray.300"
                    mt={1}>
                    Maximum allowed: ₦
                    {metrics?.remainingBalance.toLocaleString()}
                  </Text>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel fontSize={{ base: "xs", md: "sm" }}>
                    Payment Method
                  </FormLabel>
                  <Select
                    name="paymentMethod"
                    value={paymentForm.paymentMethod}
                    onChange={handleInputChange}
                    placeholder="Select method"
                    size={{ base: "sm", md: "md" }}>
                    <option value="Cash">💵 Cash</option>
                    <option value="Bank">🏦 Bank Transfer</option>
                    <option value="POS">💳 POS</option>
                    <option value="Check">📑 Cheque</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <Divider my={{ base: 3, md: 4 }} />
                <Stack spacing={{ base: 2, md: 3 }}>
                  <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                    Payment Summary:
                  </Text>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={{ base: 1, md: 2 }}
                    fontSize={{ base: "xs", md: "sm" }}>
                    <Text color="gray.300">Total Job Amount:</Text>
                    <Text fontWeight="bold">
                      ₦{metrics?.totalJobAmount.toLocaleString()}
                    </Text>
                    <Text color="gray.300">Previously Paid:</Text>
                    <Text fontWeight="bold">
                      ₦{metrics?.previouslyPaid.toLocaleString()}
                    </Text>
                    <Text color="gray.300">Current Payment:</Text>
                    <Text fontWeight="bold">
                      ₦{(Number(paymentForm.amount) || 0).toLocaleString()}
                    </Text>
                    <Text color="gray.300">Remaining Balance:</Text>
                    <Text
                      fontWeight="bold"
                      color={
                        metrics?.remainingBalance === 0
                          ? "green.500"
                          : "orange.500"
                      }>
                      ₦
                      {(
                        (metrics?.remainingBalance || 0) -
                        (Number(paymentForm.amount) || 0)
                      ).toLocaleString()}
                    </Text>
                  </Grid>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter
            justifyContent="left"
            borderTop="1px solid"
            borderColor="gray.200"
            flexDir={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 4 }}>
            <Button
              colorScheme="blue"
              onClick={handleSubmitPayment}
              size="sm"
              w={{ base: "full", sm: "auto" }}
              isLoading={isSubmitting}
              loadingText="Saving...">
              Save Payment
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              w={{ base: "full", sm: "auto" }}
              isDisabled={isSubmitting}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Payment Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={onEditClose}
        size={{ base: "full", md: "xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Payment</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Payment Phase</FormLabel>
                <Select
                  name="paymentPhase"
                  value={paymentForm.paymentPhase}
                  onChange={handleInputChange}>
                  <option value="First">First Payment</option>
                  <option value="Second">Second Payment</option>
                  <option value="Third">Third Payment</option>
                  <option value="Final">Final Payment</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftAddon>₦</InputLeftAddon>
                  <Input
                    name="amount"
                    type="number"
                    value={paymentForm.amount}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  name="paymentMethod"
                  value={paymentForm.paymentMethod}
                  onChange={handleInputChange}>
                  <option value="Cash">Cash</option>
                  <option value="POS">POS</option>
                  <option value="Bank">Bank Transfer</option>
                  <option value="Check">Cheque</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              size="sm"
              variant="ghost"
              onClick={onEditClose}
              isDisabled={isUpdating}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleEditPayment}
              isLoading={isUpdating}
              loadingText="Updating...">
              Update Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
export default withAuth(CustomerJobOrderAccount, [
  "workshopManager",
  "accountant",
]);
