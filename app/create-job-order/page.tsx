/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  useToast,
  Divider,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Sidebar from "../components/major/SidebarMenu";
import MainContent from "../components/minor/MainContainer";
import { motion } from "framer-motion";
import { FaClipboard } from "react-icons/fa";

import TabA from "../components/minor/TabA";
import TabB from "../components/minor/TabB";
import TabC from "../components/minor/TabC";
import TabD from "../components/minor/TabD";
import { JobOrderFormData } from "../utils/types/formData";
import { withAuth } from "../utils/services/ProtectecRoute";
import { createJobOrder } from "../utils/services/JobOrder";
import { useRouter } from "next/navigation";
import {
  ActionButton,
  FormContainer,
} from "../components/minor/styling/jobOrderStyle";

// Styled components

function CreateJobOrderPage() {
  const toast = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<JobOrderFormData>({
    sectionA: {
      clientInformation: {
        clientName: "",
        clientPhone: "",
        clientEmail: "",
        clientBirthday: "", // Fixed format
      },
      vehicleInformation: {
        carVIN: "",
        carIssue: "",
        carChassis: "",
        carPlate: "",
        carMake: "",
        carYear: 0,
        carColour: "",
        odometer: 0,
        dateSelected: "",
        customerRequest: "",
        descriptionOfWork: "",
      },
    },
    sectionB: {
      exterior: {
        windShieldCracks: false,
        bodyPanelMatch: false,
        magnetAdheres: false,
        freshPaintJob: false,
        seamsAligned: false,
        freeBodyScratches: false,
        freeBodyDents: false,
        headlightsFunctional: false,
      },
      brake: {
        straightSteering: false,
        parkingBrakeWorks: false,
        noGrindingNoise: false,
        antiLockBrakesWork: false,
      },
      suspension: {
        vehicleRestsLevelly: false,
        bounceWithoutNoise: false,
        cornersRespondEqually: false,
      },
      engine: {
        freeLeaks: false,
        oilFillerClean: false,
        batteryTerminalsClean: false,
        dipStickOilQuality: false,
        noOdoursRunning: false,
        exhaustEmissionsNormal: false,
      },
      interior: {
        seatsCondition: false,
        allDoorsWork: false,
        trunkOpens: false,
        gaugesWork: false,
        dashboardLightsOff: false,
        stereoWorks: false,
        heatersWork: false,
        acWorks: false,
        windshieldWipersWork: false,
        seatBeltsFunctional: false,
        seatAdjustsWell: false,
        sunRoofOpensWell: false,
        carAlarmWorks: false,
        driverSideLocksAndUnlocksWithKey: false,
        hazardLightWorks: false,
        headlightWorksProperly: false,
      },
      tyres: {
        reputableBrand: false,
        sameType: false,
        freeFromDamage: false,
        treadEvenWear: false,
        spareTireAvailable: false,
        spareTireInflated: false,
      },
      automaticTransmission: {
        fluidIsClean: false,
      },
      steering: {
        doesNotOneSide: false,
        vehicleIsStable: false,
        noResistance: false,
        noClicking: false,
      },
      battery: {
        batteryPresent: false,
        batteryLevel: false,
      },
      miscellaneous: {
        manualAvailable: false,
        accessoriesInstructions: false,
        serviceRecordsAvailable: false,
        ownerHasTitle: false,
      },
      underHood: {
        oilLevels: false,
        brakeFluid: false,
        coolantLevels: false,
        airFilter: false,
      },
    },
    sectionC: {
      bodyCheckList: {
        windscreenCracks: false,
        lightsFunctional: false,
        spareTireEquipment: false,
        steeringButtons: false,
        centralLockWorks: false,
        radioFunctional: false,
        windshieldWipersDispense: false,
        hornWorks: false,
        seatAdjustable: false,
        acCooling: false,
        engineCover: false,
        reverseCamera: false,
      },
      fuelLevel: 0, // Store as string percentage
    },
    sectionD: {
      assignTechnicians: "", // Keep if intentionally empty, or provide a team name string
      customerJobOrderStatus: "Disapprove", // Keep if intended, but ensure capitalization is correct
      jobOrderStatus: "Inprogress", // Fixed format, one word
      repairStatus: "Pending", // Keep if intended
      carReceivedBy: "",
    },
  });

  // Generic helper for updating an entire section
  const updateSection = (section: keyof JobOrderFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  // Helper for updating nested fields in a subsection (e.g. in sectionA)
  const updateSubsection = (
    section: keyof JobOrderFormData,
    subsection: string,
    field: string,
    value: string | number | boolean | object
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // API call to save job order
      await createJobOrder(formData);

      toast({
        title: "Success",
        description: "Job order created successfully",
        status: "success",
        position: "top-right",
        duration: 5000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job order",
        status: "error",

        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex minH="100vh" bg="gray.50">
      <Box>
        <Sidebar />
      </Box>
      <MainContent>
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          p={{ base: 2, md: 4, xl: 8 }}
          mt={{ base: 10, xl: 4 }}>
          <FormContainer>
            <Flex align="center" mb={8}>
              <Icon as={FaClipboard} fontSize="sm" color="blue.500" mr={3} />
              <Heading size="sm" color="gray.700" fontWeight="600">
                New Job Order
              </Heading>
            </Flex>

            <Tabs variant="enclosed">
              <TabList>
                <Tab>Section A</Tab>
                <Tab>Section B</Tab>
                <Tab>Section C</Tab>
                <Tab>Section D</Tab>
              </TabList>

              <TabPanels>
                {/* Section A: Client & Vehicle Info */}
                <TabPanel>
                  <TabA
                    formData={formData.sectionA}
                    onChange={(subKey, data) =>
                      updateSection("sectionA", {
                        ...formData.sectionA,
                        [subKey]: {
                          ...formData.sectionA[subKey],
                          ...data,
                        },
                      })
                    }
                  />
                </TabPanel>
                {/* Section B: Checklists */}
                <TabPanel>
                  <TabB
                    formData={formData.sectionB}
                    onChange={(category, field, value) =>
                      updateSubsection("sectionB", category, field, value)
                    }
                  />
                </TabPanel>
                {/* Section C: Body Checklist, Fuel Level & Assign Technicians */}
                <TabPanel>
                  <TabD
                    formData={formData.sectionC}
                    onChange={(field, value) =>
                      updateSubsection(
                        "sectionC",
                        "bodyCheckList",
                        field,
                        value
                      )
                    }
                    onFuelChange={(value: number) =>
                      updateSection("sectionC", {
                        ...formData.sectionC,
                        fuelLevel: value,
                      })
                    }
                  />
                </TabPanel>
                {/* Section D: Job Order & Repair Status, Car Received By */}
                <TabPanel>
                  <TabC
                    onTechniciansChange={(value: string) =>
                      updateSection("sectionD", {
                        ...formData.sectionD,
                        assignTechnicians: value,
                      })
                    }
                    formData={formData.sectionD}
                    onChange={(field, value) =>
                      updateSection("sectionD", {
                        ...formData.sectionD,
                        [field]: value,
                      })
                    }
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Divider my={8} borderColor="gray.200" />

            <Flex justify="flex-end" gap={4}>
              <ActionButton
                size="sm"
                colorScheme="blue"
                onClick={() => {
                  router.push("/dashboard");
                }}
                color="gray.600"
                border="1px solid"
                borderColor="gray.300">
                Cancel
              </ActionButton>
              <ActionButton
                isLoading={isSubmitting}
                colorScheme="blue"
                size="sm"
                onClick={handleSubmit}>
                Create Job Order
              </ActionButton>
            </Flex>
          </FormContainer>
        </Box>
      </MainContent>
    </Flex>
  );
}

export default withAuth(CreateJobOrderPage, ["workshopManager", "frontDesk"]);
