"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "@/app/components/major/SidebarMenu";
import MainContent from "@/app/components/minor/MainContainer";
import Header from "@/app/components/minor/HeaderNav";
import { withAuth } from "../utils/services/ProtectecRoute";
import { Staff } from "../utils/types/staff";
import { deleteStaff, fetchStaff } from "../utils/services/staff";
import { StaffTable } from "../components/minor/tables/StaffTable";
import { EditStaffModal } from "../components/minor/modals/EditStaffModal";
import { AddStaffModal } from "../components/minor/modals/AddStaffModal";

function UsersPage() {
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const toast = useToast();

  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const staffData = await fetchStaff();

      setStaffData(staffData);
    } catch (error) {
      console.error("Failed to fetch technicians:", error);
      toast({
        title: "Error",
        description: "Failed to load technicians",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshStaff = async () => {
    setLoading(true);
    try {
      const staffData = await fetchStaff();
      setStaffData(staffData);
      toast({
        title: "Success",
        description: "Table Updated Successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to refresh technicians:", error);
      toast({
        title: "Error",
        description: "Failed to refresh technicians list",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (staffToDelete: Staff) => {
    try {
      await deleteStaff(staffToDelete._id);

      await refreshStaff();
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Error",
        description: "Failed to delete User",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handleUpdate = async () => {
    await refreshStaff();
  };

  return (
    <Flex>
      <Box>
        <Sidebar />
      </Box>
      <MainContent>
        <Box
          flex="1"
          p={{
            base: 2,
            md: 4,
            xl: 8,
          }}
          mt={{ base: 10, xl: 4 }}
        >
          <Header />
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="sm">Users</Heading>
            <Flex>
              <Button
                colorScheme="blue"
                color="white"
                leftIcon={<FaPlus />}
                onClick={onAddModalOpen}
                size="sm"
              >
                Add User
              </Button>
            </Flex>
          </Flex>
          <StaffTable
            staffMembers={staffData}
            onEdit={(staffDetail) => {
              setEditingStaff(staffDetail);
              onEditModalOpen();
            }}
            onDelete={handleDelete}
            isLoading={loading}
          />
        </Box>
      </MainContent>

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onSuccess={async () => {
          await refreshStaff();
        }}
        initialData={{
          fullName: "",
          phoneNumber: "",
          email: "",
          workshop: "",
          role: "",
          password: "",
          status: "On Duty",
        }}
      />
      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        onUpdate={handleUpdate}
        staff={editingStaff}
      />
    </Flex>
  );
}
export default withAuth(UsersPage, ["workshopManager"]);
