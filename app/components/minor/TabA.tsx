import React from "react";
import {
  Box,
  VStack,
  Icon,
  FormControl,
  FormLabel,
  HStack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { FaUser, FaCar, FaTools } from "react-icons/fa";
import { InputField, TextAreaField } from "./Form";
import { SectionTitle } from "./styling/sectionTitle";
import {
  ClientInformation,
  VehicleInformation,
} from "@/app/utils/types/formData";

interface TabAProps {
  formData: {
    clientInformation: ClientInformation;
    vehicleInformation: VehicleInformation;
  };
  onChange: (
    subKey: "clientInformation" | "vehicleInformation",
    data: Partial<ClientInformation | VehicleInformation>
  ) => void;
}

const TabA: React.FC<TabAProps> = ({ formData, onChange }) => {
  const handleClientInfoChange = (field: string, value: string) => {
    onChange("clientInformation", { [field]: value });
  };

  const handleVehicleInfoChange = (field: string, value: string) => {
    onChange("vehicleInformation", { [field]: value });
  };

  return (
    <>
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaUser}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Client Information</Box>
        </SectionTitle>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          <InputField
            name="clientName"
            placeholder="Client Name"
            value={formData.clientInformation.clientName}
            onChange={(e) =>
              handleClientInfoChange("clientName", e.target.value)
            }
          />
          <InputField
            name="clientPhone"
            placeholder="Client Phone Number"
            value={formData.clientInformation.clientPhone}
            onChange={(e) =>
              handleClientInfoChange("clientPhone", e.target.value)
            }
          />
          <InputField
            name="clientEmail"
            placeholder="Client Email"
            value={formData.clientInformation.clientEmail}
            onChange={(e) =>
              handleClientInfoChange("clientEmail", e.target.value)
            }
          />
          <InputField
            name="clientBirthday"
            placeholder="Client Birthday"
            value={formData.clientInformation.clientBirthday}
            onChange={(e) =>
              handleClientInfoChange("clientBirthday", e.target.value)
            }
          />
        </VStack>
      </Box>

      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaCar}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Vehicle Information</Box>
        </SectionTitle>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          <InputField
            name="carVIN"
            placeholder="Car VIN"
            value={formData.vehicleInformation.carVIN}
            onChange={(e) => handleVehicleInfoChange("carVIN", e.target.value)}
          />
          <InputField
            name="carChassis"
            placeholder="Car Chassis Number"
            value={formData.vehicleInformation.carChassis}
            onChange={(e) =>
              handleVehicleInfoChange("carChassis", e.target.value)
            }
          />
          <InputField
            name="carPlate"
            placeholder="Car Plate Number"
            value={formData.vehicleInformation.carPlate}
            onChange={(e) =>
              handleVehicleInfoChange("carPlate", e.target.value)
            }
          />
          <InputField
            name="carMake"
            placeholder="Car Make"
            value={formData.vehicleInformation.carMake}
            onChange={(e) => handleVehicleInfoChange("carMake", e.target.value)}
          />
          <Text>Input Car Year</Text>
          <InputField
            name="carYear"
            placeholder="Car Year"
            value={formData.vehicleInformation.carYear}
            onChange={(e) => handleVehicleInfoChange("carYear", e.target.value)}
          />
          <FormControl>
            <FormLabel fontSize={{ base: "xs", md: "sm" }}>
              Select Date
            </FormLabel>
            <input
              type="date"
              style={{
                backgroundColor: "#3280cd",
                color: "white",
                padding: "8px",
                border: "1px solid #bdbdb",
                borderRadius: "8px",
                width: "100%",
                fontSize: "14px",
              }}
              value={formData.vehicleInformation.dateSelected}
              onChange={(e) =>
                handleVehicleInfoChange("dateSelected", e.target.value)
              }
            />
          </FormControl>
          <InputField
            name="carIssue"
            placeholder="Car Issue"
            value={formData.vehicleInformation.carIssue}
            onChange={(e) =>
              handleVehicleInfoChange("carIssue", e.target.value)
            }
          />
          <InputField
            name="carColour"
            placeholder="Car Colour"
            value={formData.vehicleInformation.carColour}
            onChange={(e) =>
              handleVehicleInfoChange("carColour", e.target.value)
            }
          />
          <Text>Input Odometer</Text>
          <InputField
            name="odometer"
            placeholder="Odometer"
            value={formData.vehicleInformation.odometer}
            onChange={(e) =>
              handleVehicleInfoChange("odometer", e.target.value)
            }
          />

          <TextAreaField
            name="customerRequest"
            placeholder="Customer's Request"
            value={formData.vehicleInformation.customerRequest}
            onChange={(e) =>
              handleVehicleInfoChange("customerRequest", e.target.value)
            }
          />
        </VStack>
      </Box>

      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Description of Work</Box>
        </SectionTitle>
        <HStack>
          <Textarea
            name="descriptionOfWork"
            _placeholder={{ color: "#bdbdbd" }}
            bgColor="rgba(247, 250, 252, 0.8)"
            border="1px solid #e2e8f0"
            borderRadius="sm"
            p={{ base: 2, md: 4 }}
            fontSize={{ base: "xs", md: "sm" }}
            placeholder="Describe the work to be done on this vehicle"
            value={formData.vehicleInformation.descriptionOfWork}
            onChange={(e) =>
              handleVehicleInfoChange("descriptionOfWork", e.target.value)
            }
          />
        </HStack>
      </Box>
    </>
  );
};

export default TabA;
