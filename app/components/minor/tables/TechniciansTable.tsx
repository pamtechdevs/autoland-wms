import {
  Box,
  Button,
  HStack,
  Badge,
  Tr,
  Td,
  Thead,
  Th,
  Tbody,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Technician } from "../../../utils/types/technicians";
import { StyledTable } from "../styling/technicians.styles";

interface TechniciansTableProps {
  technicians: Technician[];
  onEdit: (technician: Technician) => void;
  onDelete: (technician: Technician) => void;
  isLoading: boolean;
}

export const TechniciansTable = ({
  technicians,
  onEdit,
  onDelete,
  isLoading,
}: TechniciansTableProps) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box
      overflowX="auto"
      shadow="sm"
      rounded="lg"
      bg="white"
      css={{
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#cbd5e0",
          borderRadius: "4px",
          "&:hover": {
            background: "#a0aec0",
          },
        },
      }}>
      <Box minWidth="1200px">
        <StyledTable>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Workshop</Th>
              <Th>Email</Th>
              <Th>Speciality</Th>
              <Th>Team</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {technicians.map((technician, index) => (
              <Tr key={index}>
                <Td>{technician?.fullName}</Td>
                <Td>{technician?.phoneNumber}</Td>
                <Td>{technician?.workshop}</Td>
                <Td>{technician?.email}</Td>
                <Td>{technician?.specialty}</Td>
                <Td>{technician?.team}</Td>
                <Td>
                  <Badge
                    borderRadius="xl"
                    p={1}
                    variant="solid"
                    colorScheme={
                      technician?.status === "On Duty" ? "green" : "red"
                    }>
                    {technician?.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => onEdit(technician)}
                      leftIcon={<FaEdit />}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => onDelete(technician)}
                      leftIcon={<FaTrash />}>
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </StyledTable>
      </Box>
    </Box>
  );
};
