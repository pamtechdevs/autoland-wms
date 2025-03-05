import { UserFormData } from "@/app/utils/types/user";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  HStack,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface UserTableProps {
  users: UserFormData[];
  onEdit: (user: UserFormData) => void;
  onDelete: (user: UserFormData) => void;
}

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <Table>
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
        {users.map((user, index) => (
          <Tr key={index}>
            <Td>{user.name}</Td>
            <Td>{user.phone}</Td>
            <Td>{user.workshop}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>
              <Badge colorScheme={user.status === "On Duty" ? "green" : "red"}>
                {user.status}
              </Badge>
            </Td>
            <Td>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => onEdit(user)}
                  leftIcon={<FaEdit />}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => onDelete(user)}
                  leftIcon={<FaTrash />}
                >
                  Delete
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
