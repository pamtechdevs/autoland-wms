/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Divider,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";

import { FaClipboard } from "react-icons/fa";
import Sidebar from "@/app/components/major/SidebarMenu";
import TabA from "@/app/components/minor/TabA";
import TabB from "@/app/components/minor/TabB";
import TabD from "@/app/components/minor/TabD";
import TabC from "@/app/components/minor/TabC";

import { withAuth } from "@/app/utils/services/ProtectecRoute";
import { JobOrderFormData } from "@/app/utils/types/formData";
import { fetchJobOrder, updateJobOrder } from "@/app/utils/services/JobOrder";
import { useRouter } from "next/navigation";
import { PageProps } from "@/app/utils/types/jobOrder";
import {
  ActionButton,
  FormContainer,
} from "@/app/components/minor/styling/jobOrderStyle";

function RegistrationPage({ params }: PageProps) {
  const jobId = params.id;

  const toast = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      fuelLevel: 0,
    },
    sectionD: {
      assignTechnicians: "",
      customerJobOrderStatus: "Disapprove",
      jobOrderStatus: "Inprogress",
      repairStatus: "Pending",
      carReceivedBy: "",
    },
  });

  useEffect(() => {
    const fetchJobOrderDetails = async () => {
      try {
        // Add your API call here to fetch job order data using jobId
        const response = await fetchJobOrder(jobId);

        if (response) {
          setFormData(response);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch job order",
          status: "error",
          position: "top-right",
          duration: 5000,
        });
      }
    };

    if (jobId) {
      fetchJobOrderDetails();
    }
  }, [jobId, toast]);

  const updateSection = (
    section: keyof JobOrderFormData,
    value: string | number | boolean | object
  ) => {
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
      // Update the API call to include the jobId
      await updateJobOrder(jobId, formData);
      toast({
        title: "Success",
        description: "Job order updated successfully",
        status: "success",
        position: "top-right",
        duration: 5000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to Update job order",
        status: "error",

        position: "top-right",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      width={{ base: "85vw", md: "auto" }}
      justifyContent="center"
      // bg="gray.50"
    >
      <Box>
        <Sidebar />
      </Box>
      <Box width="100%">
        <Box
          // as={motion.div}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          p={{
            base: 2,
            md: 4,
            xl: 8,
          }}
          mt={{ base: 10, xl: 4 }}>
          <FormContainer>
            <Box>
              <Flex
                align="center"
                mb={{ base: 4, md: 8 }}
                direction={{ base: "column", sm: "row" }}
                gap={2}>
                <Icon as={FaClipboard} fontSize="sm" color="blue.500" mr={3} />
                <Heading
                  size={{ base: "xs", md: "sm" }}
                  color="gray.700"
                  fontWeight="600">
                  Update Job Order
                </Heading>
              </Flex>

              <Tabs variant="enclosed" size={{ base: "sm", md: "md" }} isFitted>
                <TabList display="flex" flexWrap="wrap">
                  <Tab
                    fontSize={{ base: "xs", md: "sm" }}
                    px={{ base: 2, md: 4 }}>
                    Section A
                  </Tab>
                  <Tab
                    fontSize={{ base: "xs", md: "sm" }}
                    px={{ base: 2, md: 4 }}>
                    Section B
                  </Tab>
                  <Tab
                    fontSize={{ base: "xs", md: "sm" }}
                    px={{ base: 2, md: 4 }}>
                    Section C
                  </Tab>
                  <Tab
                    fontSize={{ base: "xs", md: "sm" }}
                    px={{ base: 2, md: 4 }}>
                    Section D
                  </Tab>
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
                      formData={formData.sectionD}
                      onChange={(field, value) =>
                        updateSection("sectionD", {
                          ...formData.sectionD,
                          [field]: value,
                        })
                      }
                      onTechniciansChange={(value: string) =>
                        updateSection("sectionD", {
                          ...formData.sectionD,
                          assignTechnicians: value,
                        })
                      }
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Divider my={{ base: 4, md: 8 }} borderColor="gray.200" />
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
                  colorScheme="blue"
                  size="sm"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}>
                  Update Job Order
                </ActionButton>
              </Flex>
            </Box>
          </FormContainer>
        </Box>
      </Box>
    </Flex>
  );
}
export default withAuth(RegistrationPage, ["workshopManager", "frontDesk"]);
