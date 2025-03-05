import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Expense } from "../utils/types/expenses";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <Table variant="simple">
      <Thead bg="gray.50">
        <Tr>
          <Th>ID</Th>
          <Th>Category</Th>
          <Th>Description</Th>
          <Th isNumeric>Amount</Th>
          <Th>Date</Th>
          <Th>Payment Method</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {expenses.map((expense) => (
          <Tr key={expense.expenseId}>
            <Td fontWeight="medium">{expense.expenseId}</Td>
            <Td>{expense.category}</Td>
            <Td>{expense.description}</Td>
            <Td isNumeric fontWeight="bold">
              ₦{expense.amount}
            </Td>
            <Td>{new Date(expense.createdAt).toLocaleDateString()}</Td>
            <Td>{expense.paymentMethod}</Td>
            <Td>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  colorScheme="blue"
                  leftIcon={<FaEdit />}
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  leftIcon={<FaTrash />}
                  onClick={() => onDelete(expense.expenseId)}
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

export default ExpenseTable;
