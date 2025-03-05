import React from "react";
import {
  Box,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  Select,
  VStack,
} from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";
import { CheckboxGroup } from "./Form";
import { SectionTitle } from "./styling/sectionTitle";

interface TabDFormData {
  bodyCheckList: { [key: string]: boolean };
  fuelLevel: number;
}

interface TabDProps {
  formData: TabDFormData;
  onChange: (field: string, value: boolean) => void;
  onFuelChange: (value: number) => void;
}

const TabD: React.FC<TabDProps> = ({ formData, onChange, onFuelChange }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleChecklistChange = (field: string, value: boolean) => {
    onChange(field, value);
  };

  return (
    <>
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Body Check List</Box>
        </SectionTitle>
        <CheckboxGroup
          options={[
            { label: "Windscreen cracks", value: "windscreenCracks" },
            { label: "Lights functional", value: "lightsFunctional" },
            { label: "Spare tire equipment", value: "spareTireEquipment" },
            { label: "Steering buttons", value: "steeringButtons" },
            { label: "Central lock works", value: "centralLockWorks" },
            { label: "Radio functional", value: "radioFunctional" },
            {
              label: "Windshield wipers dispense",
              value: "windshieldWipersDispense",
            },
            { label: "Horn works", value: "hornWorks" },
            { label: "Seat adjustable", value: "seatAdjustable" },
            { label: "AC cooling", value: "acCooling" },
            { label: "Engine cover", value: "engineCover" },
            { label: "Reverse camera", value: "reverseCamera" },
          ]}
          values={formData.bodyCheckList}
          onChange={(field, value) => handleChecklistChange(field, value)}
        />

        <SectionTitle mt={{ base: 6, md: 8 }}>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Fuel Level</Box>
        </SectionTitle>
        <Box mt={{ base: 4, md: 6 }}>
          <Slider
            id="slider"
            value={formData.fuelLevel}
            min={0}
            max={100}
            colorScheme="blue"
            onChange={(v) => onFuelChange(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
            <SliderMark
              value={25}
              mt="1"
              ml="-2.5"
              fontSize={{ base: "xs", md: "sm" }}>
              25%
            </SliderMark>
            <SliderMark
              value={50}
              mt="1"
              ml="-2.5"
              fontSize={{ base: "xs", md: "sm" }}>
              50%
            </SliderMark>
            <SliderMark
              value={75}
              mt="1"
              ml="-2.5"
              fontSize={{ base: "xs", md: "sm" }}>
              75%
            </SliderMark>
            <SliderTrack bg="gray.200" height={{ base: 1, md: 2 }}>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${formData.fuelLevel}%`}
              fontSize={{ base: "xs", md: "sm" }}>
              <SliderThumb boxSize={{ base: 4, md: 6 }} />
            </Tooltip>
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default TabD;
