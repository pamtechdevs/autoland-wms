"use client";
import {
  Box,
  Flex,
  Button,
  Text,
  HStack,
  useDisclosure,
  Icon,
  Collapse,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPlus, FaUserFriends } from "react-icons/fa";
import Sidebar from "../components/major/SidebarMenu";
import MainContent from "../components/minor/MainContainer";
import Header from "../components/minor/HeaderNav";
import MetricCards from "../components/minor/MetricCards";
import JobOrderTable from "../components/major/JobOrderTable";
import { FaClipboardList, FaClock, FaWallet } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MetricCardData } from "../utils/types/metrics";
import { withAuth } from "../utils/services/ProtectecRoute";
import { useEffect, useState } from "react";
import { BookingStats } from "../utils/types/bookingStats";
import { fetchBookingStats } from "../utils/services/bookingStats";
function BookingPage() {
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null); // State to hold booking stats data

  useEffect(() => {
    const loadBookingStats = async () => {
      try {
        const fetchedStats = await fetchBookingStats(); // Fetch booking stats
        setBookingStats(fetchedStats); // Update state with fetched data
      } catch (error) {
        console.error("Failed to load booking stats:", error);
      }
    };

    loadBookingStats();
  }, []); // Empty dependency array to run once on mount

  const { isOpen, onToggle } = useDisclosure();
  const JobOrderMetrics: MetricCardData[] = [
    {
      title: "Total Job Orders",
      value: `${bookingStats?.total || "0"}`,
      change: "+12.5%",
      isIncrease: true,
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, purple.400, purple.600)",
    },
    {
      title: "Ongoing",
      value: `${bookingStats?.ongoing || "0"}`,
      change: "+8.2%",
      isIncrease: true,
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, blue.400, blue.600)",
    },
    {
      title: "Completed",
      value: `${bookingStats?.completed || "0"}`,
      change: "+5.1%",
      isIncrease: true,
      icon: FaCheckCircle,
      color: "green.500",
      bgGradient: "linear(to-r, green.400, green.600)",
    },
    {
      title: "Pending",
      value: `${bookingStats?.pending || "0"}`,
      change: "-2.3%",
      isIncrease: false,
      icon: FaClock,
      color: "orange.500",
      bgGradient: "linear(to-r, orange.400, orange.600)",
    },
  ];

  return (
    <>
      {bookingStats ? (
        <Flex>
          <Sidebar />
          <MainContent>
            <Box
              flex="1"
              p={{
                base: 2,
                md: 4,
                xl: 8,
              }}
              mt={{ base: 10, xl: 4 }}
              w="full"
            >
              <Header />
              <MetricCards metrics={JobOrderMetrics} />

              {/* Walk-in Header Section */}
              <Box
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                mb={{ base: 4, md: 8 }} // Responsive margin
                py={{ base: 3, md: 4 }} // Responsive padding
                px={{ base: 4, md: 6 }}
                borderRadius={{ base: "xl", md: "2xl" }}
                bg="white"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  bottom={0}
                  width={{ base: "30%", md: "40%" }}
                  bgGradient="linear(to-r, blue.50, purple.50)"
                  opacity={0.1}
                />

                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align={{ base: "stretch", md: "center" }}
                  gap={{ base: 3, md: 4 }}
                >
                  <HStack spacing={{ base: 3, md: 4 }} align="flex-start">
                    <Icon
                      as={FaUserFriends}
                      fontSize={{ base: "md", md: "lg" }}
                      color="blue.500"
                    />
                    <VStack align="stretch" spacing={{ base: 0.5, md: 1 }}>
                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="bold"
                        color="gray.700"
                      >
                        Walk-in Customers
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="gray.500"
                      >
                        Manage walk-in job orders and customer repairs
                      </Text>
                    </VStack>
                  </HStack>

                  <Flex
                    flexDir="column"
                    gap={2}
                    w={{ base: "full", md: "auto" }}
                  >
                    <Button
                      as={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      size="sm"
                      fontWeight="medium"
                      colorScheme="blue"
                      leftIcon={<FaPlus />}
                      onClick={onToggle}
                      boxShadow="sm"
                      w={{ base: "full", md: "auto" }}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                    >
                      Add Job Order
                    </Button>

                    <Collapse in={isOpen} animateOpacity>
                      <Flex
                        justifyContent={{
                          base: "stretch",
                          md: "space-between",
                        }}
                        gap={4}
                        mt={2}
                      >
                        <Button
                          as="a"
                          href="/create-job-order"
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="normal"
                          size="sm"
                          colorScheme="blue"
                          flex={1}
                        >
                          New
                        </Button>
                        <Button
                          as="a"
                          href="/customers"
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="normal"
                          size="sm"
                          colorScheme="blue"
                          flex={1}
                        >
                          Old
                        </Button>
                      </Flex>
                    </Collapse>
                  </Flex>
                </Flex>
              </Box>

              <JobOrderTable />
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
export default withAuth(BookingPage, ["workshopManager", "frontDesk"]);
