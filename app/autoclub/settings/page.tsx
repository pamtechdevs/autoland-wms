"use client";
import Sidebar from "@/app/components/major/SidebarMenu";
import Header from "@/app/components/minor/HeaderNav";
import MainContent from "@/app/components/minor/MainContainer";
import MetricCards from "@/app/components/minor/MetricCards";
import { MetricCardData } from "@/app/utils/types/metrics";
import { DashboardStats } from "@/app/utils/types/autoclub";
import {
  Box,
  Flex,
  Grid,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaPlus,
} from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { SubscriptionTierCard } from "@/app/components/major/autoclub/SubscriptionTierCard";
import { withAuth } from "@/app/utils/services/ProtectecRoute";
import { memberService } from "@/app/utils/services/member";
import { SubscriptionTierFormModal } from "@/app/components/major/autoclub/SubscriptionTierFormModal";

// Update the SubscriptionTier type to match the API response
interface SubscriptionTier {
  _id?: string; // Make _id optional to allow for new tiers
  tier: string;
  price: number;
  serviceFrequencyPerYear: number;
  services: {
    name: string;
    allowedTimes: number;
    _id?: string; // Make _id optional for new services
  }[];
  createdAt?: string;
  updatedAt?: string;
}

function AutoclubSettings() {
  const [subscriptionTiers, setSubscriptionTiers] = useState<
    SubscriptionTier[]
  >([]);
  const [editingTier, setEditingTier] = useState<
    SubscriptionTier | undefined
  >();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    platinumUsers: 0,
    diamondUsers: 0,
    goldUsers: 0,
    silverUsers: 0,
  });

  // Fetch dashboard stats and subscription tiers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch dashboard stats
        const statsResponse = await memberService.getDashboardStats();
        setDashboardStats(statsResponse.data);

        // Fetch subscription tiers
        const tiersResponse = await memberService.getAllSubscriptions();
        setSubscriptionTiers(tiersResponse.data);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to fetch data",
          status: "error",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Generate metric cards based on dashboard stats
  const generateMetricCards = (): MetricCardData[] => [
    {
      title: "Platinum Users",
      value: dashboardStats.platinumUsers.toString(),
      icon: FaWallet,
      color: "purple.500",
      bgGradient: "linear(to-r, purple.400, purple.600)",
    },
    {
      title: "Diamond Users",
      value: dashboardStats.diamondUsers.toString(),
      icon: FaClipboardList,
      color: "blue.500",
      bgGradient: "linear(to-r, blue.400, blue.600)",
    },
    {
      title: "Gold Users",
      value: dashboardStats.goldUsers.toString(),
      icon: FaCheckCircle,
      color: "green.500",
      bgGradient: "linear(to-r, green.400, green.600)",
    },
    {
      title: "Silver Users",
      value: dashboardStats.silverUsers.toString(),
      icon: FaClock,
      color: "orange.500",
      bgGradient: "linear(to-r, orange.400, orange.600)",
    },
  ];

  // Update handlers to work with the new subscription tier structure
  const handleAddTier = () => {
    setEditingTier(undefined);
    onOpen();
  };

  const handleSubmit = async (tierData: SubscriptionTier) => {
    try {
      if (editingTier) {
        // Update existing tier logic will go here
        // We'll implement this in the next step

        setSubscriptionTiers((prev) =>
          prev.map((t) => (t._id === editingTier._id ? tierData : t))
        );

        toast({
          title: "Tier Updated",
          description: "The subscription tier has been updated successfully",
          status: "success",
          duration: 3000,
        });
      } else {
        // Create new tier
        const response = await memberService.createSubscription(tierData);

        // Add the new tier to the local state
        setSubscriptionTiers((prev) => [...prev, response.data]);

        toast({
          title: "Tier Created",
          description: "New subscription tier has been created successfully",
          status: "success",
          duration: 3000,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save subscription tier",
        status: "error",
        duration: 3000,
      });
    }
  };

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
          mt={{ base: 10, xl: 4 }}
        >
          <Header />

          {isLoading ? (
            <Center py={10}>
              <Spinner size="xl" color="blue.500" thickness="4px" />
            </Center>
          ) : (
            <>
              <MetricCards metrics={generateMetricCards()} />

              {/* Subscription Tiers Section */}
              <Flex justify="space-between" align="center" my={6}>
                <Box fontSize="lg" fontWeight="bold">
                  Subscription Tiers
                </Box>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme="blue"
                  onClick={handleAddTier}
                  size="sm"
                >
                  Add New Tier
                </Button>
              </Flex>

              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap={6}
              >
                {subscriptionTiers.map((tier) => (
                  <SubscriptionTierCard key={tier._id} tier={tier} />
                ))}
              </Grid>
            </>
          )}

          {/* Add/Edit Tier Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent bgColor="gray.100" color="gray.800">
              <ModalHeader>
                {editingTier ? "Edit Subscription Tier" : "Create New Tier"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <SubscriptionTierFormModal
                  tier={editingTier}
                  onSubmit={handleSubmit}
                  onCancel={onClose}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </MainContent>
    </Flex>
  );
}

export default withAuth(AutoclubSettings, ["workshopManager", "autoclub"]);
