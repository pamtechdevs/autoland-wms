import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  VStack,
  Collapse,
  Button,
  HStack,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaFileAlt,
  FaFileInvoice,
  FaClipboardList,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { JobOrderTableType } from "@/app/utils/types/jobOrder";
import { fetchJobOrders } from "@/app/utils/services/JobOrder";

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

export default function JobOrderTable() {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [orders, setOrders] = useState<JobOrderTableType[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchJobOrders(1, 10);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    loadOrders();
  }, []);

  const handleRowClick = (orderId: string) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const handleActionClick = (orderId: string, action: string) => {
    router.push(`/job-order/${orderId}/${action}`);
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      p={{
        base: 2,
        md: 4,
        xl: 8,
      }}
      borderRadius="2xl"
      bg="cardBg"
      boxShadow="md"
      backdropFilter="blur(5px)"
      border="1px solid"
      borderColor="gray.100">
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="semibold">
          Customer Orders
        </Text>
        <Link href="/booking">
          <Flex
            align="center"
            color="blue.500"
            cursor="pointer"
            gap={2}
            _hover={{ color: "blue.600" }}>
            <Text>See More</Text>
            <FaArrowRight />
          </Flex>
        </Link>
      </Flex>

      <Box
        overflowX="auto"
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
        <Box minWidth="1800px">
          <Box
            display="grid"
            gridTemplateColumns="repeat(10, 1fr)"
            gap={4}
            bg="gray.50"
            borderRadius="lg"
            mb={2}>
            <GridHeader>Job ID</GridHeader>
            <GridHeader>Booking Date</GridHeader>
            <GridHeader>Client Name</GridHeader>
            <GridHeader>Client Email</GridHeader>
            <GridHeader>Car Issue</GridHeader>
            <GridHeader>Payment</GridHeader>
            <GridHeader>Team</GridHeader>
            <GridHeader>Customer Job Order Status</GridHeader>
            <GridHeader>Car Repair Status</GridHeader>
            <GridHeader>Delivery Status</GridHeader>
          </Box>

          <VStack spacing={2} align="stretch">
            {}
            {orders.map((order) => (
              <Box key={order.jobId}>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(10, 1fr)"
                  gap={4}
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  onClick={() => handleRowClick(order._id)}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "sm",
                    bg: "gray.50",
                  }}
                  transition="all 0.2s"
                  cursor="pointer">
                  <Flex align="center">
                    <Text fontWeight="medium">{order.jobId}</Text>
                  </Flex>

                  <Flex align="center">
                    <Text>
                      {new Date(order.bookingDate).toLocaleDateString()}
                    </Text>
                  </Flex>

                  <Flex align="center">
                    <Text>{order.clientName}</Text>
                  </Flex>

                  <Flex align="center">
                    <Text
                      color="gray.600"
                      fontSize="sm"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap">
                      {order.clientEmail}
                    </Text>
                  </Flex>

                  <Flex align="center">
                    <Text>{order.carIssue}</Text>
                  </Flex>

                  <Flex align="center">
                    <Badge
                      colorScheme={
                        order.paymentStatus === "Complete" ? "green" : "red"
                      }
                      variant="solid"
                      px={3}
                      py={1}
                      borderRadius="full">
                      {order.paymentStatus}
                    </Badge>
                  </Flex>

                  <Flex align="center">
                    <Text>{order.team}</Text>
                  </Flex>
                  <Flex align="center">
                    <Badge
                      colorScheme={
                        order.customerJobOrderStatus === "Approve"
                          ? "green"
                          : "red"
                      }
                      display="flex"
                      alignItems="center"
                      variant="solid"
                      gap={1}
                      px={3}
                      py={1}
                      borderRadius="full">
                      <Icon
                        as={
                          order.customerJobOrderStatus === "Approve"
                            ? FaCheckCircle
                            : FaClock
                        }
                        boxSize={3}
                      />
                      {order.customerJobOrderStatus}
                    </Badge>
                  </Flex>
                  <Flex align="center">
                    <Badge
                      colorScheme={
                        order.carRepairStatus === "Complete"
                          ? "green"
                          : "orange"
                      }
                      display="flex"
                      alignItems="center"
                      variant="solid"
                      gap={1}
                      px={3}
                      py={1}
                      borderRadius="full">
                      <Icon
                        as={
                          order.carRepairStatus === "Complete"
                            ? FaCheckCircle
                            : FaClock
                        }
                        boxSize={3}
                      />
                      {order.carRepairStatus}
                    </Badge>
                  </Flex>
                  <Flex align="center">
                    <Badge
                      colorScheme={
                        order.deliveryStatus === "Delivered"
                          ? "green"
                          : "orange"
                      }
                      display="flex"
                      alignItems="center"
                      variant="solid"
                      gap={1}
                      px={3}
                      py={1}
                      borderRadius="full">
                      <Icon
                        as={
                          order.deliveryStatus === "Delivered"
                            ? FaCheckCircle
                            : FaClock
                        }
                        boxSize={3}
                      />
                      {order.deliveryStatus}
                    </Badge>
                  </Flex>
                </Box>

                <Collapse in={expandedRow === order._id}>
                  <Box
                    ml={4}
                    p={4}
                    bg="gray.50"
                    borderRadius="lg"
                    mt={2}
                    border="1px dashed"
                    borderColor="gray.200">
                    <HStack spacing={4} justify="flex-end">
                      <Button
                        leftIcon={<FaFileAlt />}
                        size="sm"
                        as="a"
                        colorScheme="blue"
                        variant="outline"
                        onClick={() =>
                          handleActionClick(order._id, "registration")
                        }>
                        View Customer Order
                      </Button>
                      <Button
                        leftIcon={<FaClipboardList />}
                        size="sm"
                        as="a"
                        colorScheme="green"
                        variant="outline"
                        onClick={() =>
                          handleActionClick(order._id, "estimate")
                        }>
                        Estimate Form
                      </Button>
                      <Button
                        leftIcon={<FaClipboardList />}
                        size="sm"
                        as="a"
                        colorScheme="red"
                        variant="outline"
                        onClick={() =>
                          handleActionClick(order._id, "stockist")
                        }>
                        Stockist Form
                      </Button>
                      <Button
                        leftIcon={<FaFileInvoice />}
                        size="sm"
                        as="a"
                        colorScheme="orange"
                        variant="outline"
                        onClick={() => handleActionClick(order._id, "account")}>
                        Account
                      </Button>
                      <Button
                        leftIcon={<FaFileInvoice />}
                        size="sm"
                        as="a"
                        colorScheme="purple"
                        variant="outline"
                        onClick={() => handleActionClick(order._id, "invoice")}>
                        Invoice
                      </Button>
                    </HStack>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
