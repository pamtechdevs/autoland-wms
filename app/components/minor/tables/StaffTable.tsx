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
  Text,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Staff } from "../../../utils/types/staff";
import { StyledTable } from "../styling/technicians.styles";

interface StaffTableProps {
  staffMembers: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  isLoading: boolean;
}

export const StaffTable = ({
  staffMembers,
  onEdit,
  onDelete,
  isLoading,
}: StaffTableProps) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  // Add check for staffMembers
  if (!staffMembers || !Array.isArray(staffMembers)) {
    console.error("staffMembers is not an array:", staffMembers);
    return (
      <Flex justify="center" align="center" h="200px">
        <Text>No staff data available</Text>
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
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {staffMembers.map((staff) => (
              <Tr key={staff._id}>
                <Td>{staff?.fullName}</Td>
                <Td>{staff?.phoneNumber}</Td>
                <Td>{staff?.workshop}</Td>
                <Td>{staff?.email}</Td>
                <Td>{staff?.role}</Td>
                <Td>
                  <Badge
                    borderRadius="xl"
                    p={1}
                    variant="solid"
                    colorScheme={staff.status === "On Duty" ? "green" : "red"}>
                    {staff.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => onEdit(staff)}
                      leftIcon={<FaEdit />}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => onDelete(staff)}
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
