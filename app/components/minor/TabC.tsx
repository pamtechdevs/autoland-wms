import React from "react";
import {
  Box,
  VStack,
  Icon,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Select,
} from "@chakra-ui/react";
import { FaTools } from "react-icons/fa";
import { StyledInput } from "./Form";
import { SectionTitle } from "./styling/sectionTitle";
import { useAuth } from "@/app/utils/services/context";

interface TabCProps {
  formData: {
    assignTechnicians: string;
    customerJobOrderStatus: string;
    jobOrderStatus: string;
    repairStatus: string;
    carReceivedBy: string;
  };
  onChange: (field: string, value: string) => void;
  onTechniciansChange: (value: string) => void;
}

const TabC: React.FC<TabCProps> = ({
  formData,
  onChange,
  onTechniciansChange,
}) => {
  const { user } = useAuth();
  return (
    <>
      {/* Customer Job Order Status */}
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle mt={{ base: 6, md: 8 }}>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>Assign Technicians</Box>
        </SectionTitle>
        <VStack align="stretch" mt={4}>
          <Select
            name="assignTechnicians"
            placeholder="Select Team"
            value={formData.assignTechnicians}
            onChange={(e) => onTechniciansChange(e.target.value)}>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Alpha">
              Team ALPHA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Beta">
              Team BETA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Delta">
              Team DELTA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Gamma">
              Team GAMMA
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Omega">
              Team OMEGA
            </option>
                <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Omicron">
              Team OMICRON
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
              }}
              value="Team Sigma">
              Team SIGMA
            </option>
          </Select>
        </VStack>
      </Box>
      <Box mb={{ base: 4, md: 8 }}>
        <SectionTitle>
          <Icon
            as={FaTools}
            fontSize={{ base: "xs", md: "sm" }}
            color="blue.500"
          />
          <Box fontSize={{ base: "xs", md: "sm" }}>
            Customer Job Order Status
          </Box>
        </SectionTitle>
        <RadioGroup
          value={formData.customerJobOrderStatus}
          onChange={(val) => onChange("customerJobOrderStatus", val)}>
          <Stack spacing={{ base: 3, md: 4 }}>
            <Radio
              value="Approve"
              borderColor="green.200"
              colorScheme="green"
              size={{ base: "sm", md: "md" }}
              _hover={{ bg: "green.100" }}
              _checked={{ bg: "green.500", color: "white" }}>
              <Text fontSize={{ base: "xs", md: "sm" }}>Approve</Text>
            </Radio>
            <Radio
              value="Disapprove"
              borderColor="red.500"
              colorScheme="red"
              size={{ base: "sm", md: "md" }}
              _hover={{ bg: "red.100" }}
              _checked={{ bg: "red.500", color: "white" }}>
              <Text fontSize={{ base: "xs", md: "sm" }}>Disapprove</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {/* Job Order Status */}
      <Box mb={8}>
        <SectionTitle>
          <Icon as={FaTools} fontSize="sm" color="blue.500" />
          <Box fontSize="xs">Job Order Status</Box>
        </SectionTitle>
        <RadioGroup
          value={formData.jobOrderStatus}
          onChange={(val) => onChange("jobOrderStatus", val)}>
          <Stack spacing={4}>
            <Radio
              value="Inprogress"
              borderColor="red.500"
              colorScheme="red"
              size="md"
              _hover={{ bg: "red.100" }}
              _checked={{ bg: "red.500", color: "white" }}>
              <Text fontSize="sm">In Progress</Text>
            </Radio>
            <Radio
              value="Delivered"
              borderColor="green.200"
              colorScheme="green"
              size="md"
              _hover={{ bg: "green.100" }}
              _checked={{ bg: "green.500", color: "white" }}>
              <Text fontSize="sm">Delivered</Text>
            </Radio>
            <Radio
              value="Demurrage"
              borderColor="red.500"
              colorScheme="red"
              size="md"
              _hover={{ bg: "red.100" }}
              _checked={{ bg: "red.500", color: "white" }}>
              <Text fontSize="sm">Demurrage</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {/* Repair Status */}
      <Box mb={8}>
        <SectionTitle>
          <Icon as={FaTools} fontSize="sm" color="blue.500" />
          <Box fontSize="xs">Repair Status</Box>
        </SectionTitle>
        <RadioGroup
          value={formData.repairStatus}
          onChange={(val) => onChange("repairStatus", val)}>
          <Stack spacing={4}>
            <Radio
              value="Pending"
              borderColor="blue.200"
              colorScheme="blue"
              size="md"
              _hover={{ bg: "blue.100" }}
              _checked={{ bg: "blue.500", color: "white" }}>
              <Text fontSize="sm">Pending</Text>
            </Radio>
            <Radio
              value="Ongoing"
              borderColor="purple.200"
              colorScheme="purple"
              size="md"
              _hover={{ bg: "purple.100" }}
              _checked={{ bg: "purple.500", color: "white" }}>
              <Text fontSize="sm">Ongoing</Text>
            </Radio>
            <Radio
              value="Completed"
              borderColor="green.200"
              colorScheme="green"
              size="md"
              _hover={{ bg: "green.100" }}
              _checked={{ bg: "green.500", color: "white" }}>
              <Text fontSize="sm">Completed</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {/* Car Received By */}
      <Box mb={8}>
        <SectionTitle>
          <Icon as={FaTools} fontSize="sm" color="blue.500" />
          <Box fontSize="xs">Car Received By</Box>
        </SectionTitle>
        <VStack align="stretch">
          <StyledInput value={user?.name} isReadOnly />
        </VStack>
      </Box>
    </>
  );
};

export default TabC;
