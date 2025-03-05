import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";
import { CheckboxGroup } from "./Form";
import { SectionTitle } from "./styling/sectionTitle";

interface TabBProps {
  formData: { [key: string]: { [key: string]: boolean } };
  onChange: (category: string, field: string, value: boolean) => void;
}

const TabB: React.FC<TabBProps> = ({ formData, onChange }) => {
  return (
    <>
      {/* Exterior */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Exterior</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Windshield free of cracks", value: "windShieldCracks" },
            { label: "Body panel color match", value: "bodyPanelMatch" },
            { label: "Magnet adheres to steel panels", value: "magnetAdheres" },
            { label: "Fresh paint job", value: "freshPaintJob" },
            { label: "Seams aligned", value: "seamsAligned" },
            { label: "Free body scratches", value: "freeBodyScratches" },
            { label: "Free body dents", value: "freeBodyDents" },
            { label: "Headlights functional", value: "headlightsFunctional" },
          ]}
          values={formData.exterior}
          onChange={(field, value) => onChange("exterior", field, value)}
        />
      </Box>
      {/* Brake */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Brake</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Straight steering", value: "straightSteering" },
            { label: "Parking brake works", value: "parkingBrakeWorks" },
            { label: "No grinding noise", value: "noGrindingNoise" },
            { label: "Anti-lock brakes work", value: "antiLockBrakesWork" },
          ]}
          values={formData.brake}
          onChange={(field, value) => onChange("brake", field, value)}
        />
      </Box>
      {/* Suspension */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Suspension</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Vehicle rests levelly", value: "vehicleRestsLevelly" },
            { label: "Bounce without noise", value: "bounceWithoutNoise" },
            {
              label: "Corners respond equally",
              value: "cornersRespondEqually",
            },
          ]}
          values={formData.suspension}
          onChange={(field, value) => onChange("suspension", field, value)}
        />
      </Box>
      {/* Engine */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Engine</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Free of leaks", value: "freeLeaks" },
            { label: "Oil filler clean", value: "oilFillerClean" },
            {
              label: "Battery terminals clean",
              value: "batteryTerminalsClean",
            },
            { label: "Dipstick oil quality good", value: "dipStickOilQuality" },
            { label: "No odours running", value: "noOdoursRunning" },
            {
              label: "Exhaust emissions normal",
              value: "exhaustEmissionsNormal",
            },
          ]}
          values={formData.engine}
          onChange={(field, value) => onChange("engine", field, value)}
        />
      </Box>
      {/* Interior */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Interior</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Seats condition", value: "seatsCondition" },
            { label: "All doors work", value: "allDoorsWork" },
            { label: "Trunk opens", value: "trunkOpens" },
            { label: "Gauges work", value: "gaugesWork" },
            { label: "Dashboard lights off", value: "dashboardLightsOff" },
            { label: "Stereo works", value: "stereoWorks" },
            { label: "Heaters work", value: "heatersWork" },
            { label: "AC works", value: "acWorks" },
            { label: "Windshield wipers work", value: "windshieldWipersWork" },
            { label: "Seat belts functional", value: "seatBeltsFunctional" },
            { label: "Seats adjust well", value: "seatAdjustsWell" },
            { label: "Sunroof opens well", value: "sunRoofOpensWell" },
            { label: "Car alarm works", value: "carALarmWorks" },
            {
              label: "Driver side locks work",
              value: "driverSideLocksAndUnlocksWithKey",
            },
            { label: "Hazard lights work", value: "hazardLightWorks" },
            {
              label: "Headlights work properly",
              value: "headlightWorksProperly",
            },
          ]}
          values={formData.interior}
          onChange={(field, value) => onChange("interior", field, value)}
        />
      </Box>
      {/* Tyres */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Tyres</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Reputable brand", value: "reputableBrand" },
            { label: "Same type", value: "sameType" },
            { label: "Free from damage", value: "freeFromDamage" },
            { label: "Tread even wear", value: "treadEvenWear" },
            { label: "Spare tire available", value: "spareTireAvailable" },
            { label: "Spare tire inflated", value: "spareTireInflated" },
          ]}
          values={formData.tyres}
          onChange={(field, value) => onChange("tyres", field, value)}
        />
      </Box>
      {/* Automatic Transmission */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Automatic Transmission</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[{ label: "Fluid is clean", value: "fluidIsClean" }]}
          values={formData.automaticTransmission}
          onChange={(field, value) =>
            onChange("automaticTransmission", field, value)
          }
        />
      </Box>
      {/* Steering */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Steering</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Does not veer to one side", value: "doesNotOneSide" },
            { label: "Vehicle is stable", value: "vehicleIsStable" },
            { label: "No resistance", value: "noResistance" },
            { label: "No clicking", value: "noClicking" },
          ]}
          values={formData.steering}
          onChange={(field, value) => onChange("steering", field, value)}
        />
      </Box>
      {/* Battery */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Battery</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Battery present", value: "batteryPresent" },
            { label: "Battery level", value: "batteryLevel" },
          ]}
          values={formData.battery}
          onChange={(field, value) => onChange("battery", field, value)}
        />
      </Box>
      {/* Miscellaneous */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Miscellaneous</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Manual available", value: "manualAvailable" },
            {
              label: "Accessories instructions",
              value: "accessoriesInstructions",
            },
            {
              label: "Service records available",
              value: "serviceRecordsAvailable",
            },
            { label: "Owner has title", value: "ownerHasTitle" },
          ]}
          values={formData.miscellaneous}
          onChange={(field, value) => onChange("miscellaneous", field, value)}
        />
      </Box>
      {/* Under Hood */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Under Hood</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Oil levels", value: "oilLevels" },
            { label: "Brake fluid", value: "brakeFluid" },
            { label: "Coolant levels", value: "coolantLevels" },
            { label: "Air filter", value: "airFilter" },
          ]}
          values={formData.underHood}
          onChange={(field, value) => onChange("underHood", field, value)}
        />
      </Box>
    </>
  );
};

export default TabB;
