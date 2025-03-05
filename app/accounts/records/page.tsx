"use client";

import Sidebar from "../../components/major/SidebarMenu";
import Header from "../../components/minor/HeaderNav";
import MainContent from "../../components/minor/MainContainer";
import MetricCards from "../../components/minor/MetricCards";
import { withAuth } from "../../utils/services/ProtectecRoute";
import { MetricCardData } from "@/app/utils/types/metrics";
import { Box, Flex } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { FaClipboardList, FaClock, FaWallet } from "react-icons/fa6";

function Records() {
  const dashboardMetrics: MetricCardData[] = [
    {
      title: "Total Income",
      value: "₦90,000,000",
      change: "+12.5%",
      isIncrease: true,
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, purple.400, purple.600)",
    },
    {
      title: "Total Outflow",
      value: "₦2,000,000",
      change: "+8.2%",
      isIncrease: true,
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, blue.400, blue.600)",
    },
    {
      title: "Expenses",
      value: "₦12,000,000",
      change: "+5.1%",
      isIncrease: true,
      icon: FaCheckCircle,
      color: "green.500",
      bgGradient: "linear(to-r, green.400, green.600)",
    },
    {
      title: "Net Profit",
      value: "₦30,000,000",
      change: "-2.3%",
      isIncrease: false,
      icon: FaClock,
      color: "orange.500",
      bgGradient: "linear(to-r, orange.400, orange.600)",
    },
  ];
  return (
    <Flex>
      <Box display={{ base: "none", lg: "block" }}>
        <Sidebar />
      </Box>
      <MainContent>
        <Box flex="1" p={8}>
          <Header />
          <MetricCards metrics={dashboardMetrics} />
        </Box>
      </MainContent>
    </Flex>
  );
}
export default withAuth(Records);
