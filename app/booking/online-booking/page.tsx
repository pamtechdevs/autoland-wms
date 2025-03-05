"use client";
import JobOrderTable from "@/app/components/major/JobOrderTable";
import Sidebar from "@/app/components/major/SidebarMenu";
import Header from "@/app/components/minor/HeaderNav";
import MainContent from "@/app/components/minor/MainContainer";
import MetricCards from "@/app/components/minor/MetricCards";
import { withAuth } from "@/app/utils/services/ProtectecRoute";
import { MetricCardData } from "@/app/utils/types/metrics";
import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaUserFriends } from "react-icons/fa";
import { FaClipboardList, FaClock, FaWallet } from "react-icons/fa6";

function OnlineBooking() {
  const JobOrderMetrics: MetricCardData[] = [
    {
      title: "Total Online Orders",
      value: "142",
      change: "+12.5%",
      isIncrease: true,
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, purple.400, purple.600)",
    },
    {
      title: "Ongoing",
      value: "12",
      change: "+8.2%",
      isIncrease: true,
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, blue.400, blue.600)",
    },
    {
      title: "Compeleted",
      value: "30",
      change: "+5.1%",
      isIncrease: true,
      icon: FaCheckCircle,
      color: "green.500",
      bgGradient: "linear(to-r, green.400, green.600)",
    },
    {
      title: "Pending",
      value: "100",
      change: "-2.3%",
      isIncrease: false,
      icon: FaClock,
      color: "orange.500",
      bgGradient: "linear(to-r, orange.400, orange.600)",
    },
  ];
  return (
    <>
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
            mt={{ base: 10, xl: 4 }}
          >
            {/* Header */}
            <Header />

            {/* Enhanced Metrics Grid */}
            <MetricCards metrics={JobOrderMetrics} />
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: 0.2 }}
              mb={8}
              p={{
                base: 2,
                md: 4,
                xl: 8,
              }}
              borderRadius="2xl"
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
                width="40%"
                bgGradient="linear(to-r, blue.50, purple.50)"
                opacity={0.1}
              />

              <Flex
                justify="space-between"
                align="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
                gap={4}
              >
                <HStack spacing={4}>
                  <Icon as={FaUserFriends} fontSize="md" color="blue.500" />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">
                      Online Job orders
                    </Text>
                    <Text color="gray.500">
                      Manage Online orders and customer repairs
                    </Text>
                  </Box>
                </HStack>
              </Flex>
            </Box>
            {/* Enhanced Recent Job Orders Table */}
            <JobOrderTable />
          </Box>
        </MainContent>
      </Flex>
    </>
  );
}
export default withAuth(OnlineBooking, ["workshopManager", "frontDesk"]);
