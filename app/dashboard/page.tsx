"use client";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { FaWallet, FaClipboardList, FaClock } from "react-icons/fa";
import Sidebar from "../components/major/SidebarMenu";
import MainContent from "../components/minor/MainContainer";
import Header from "../components/minor/HeaderNav";
import { MetricCardData } from "../utils/types/metrics";
import MetricCards from "../components/minor/MetricCards";
import JobOrderTable from "../components/major/JobOrderTable";
import { withAuth } from "../utils/services/ProtectecRoute";
import { useAuth } from "../utils/services/context";
import { DashboardMetrics } from "../utils/types/dashboardMetrics";
import { useEffect, useState } from "react";
import { fetchDashboardMetrics } from "../utils/services/dashboardMetrics";

function Dashboard() {
  const { user, loading } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null); // State to hold metrics data
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
  const bgGradient = "linear(to-br, blue.50, purple.50, pink.50)";
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
      bgGradient: "linear(to-r, blue.800, blue.00)",
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

  return (
    <>
      {user && metrics ? (
        <Flex bgGradient={bgGradient} minH="100vh">
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
              {/* Header */}
              <Header />

              {/* Metrics Grid */}
              <MetricCards metrics={dashboardMetrics} />

              {/* Recent Job Orders Table */}
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
export default withAuth(Dashboard);
