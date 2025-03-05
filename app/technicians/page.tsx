/* eslint-disable react-hooks/exhaustive-deps */
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
import { FaPlus } from "react-icons/fa";
import { Technician } from "../utils/types/technicians";
import {
  fetchTechnicians,
  deleteTechnician,
} from "../utils/services/technicians";
import { AddTechnicianModal } from "../components/minor/modals/AddTechnicianModal";
import { EditTechnicianModal } from "../components/minor/modals/EditTechnicianModal";
import { TechniciansTable } from "../components/minor/tables/TechniciansTable";
import Sidebar from "../components/major/SidebarMenu";
import MainContent from "../components/minor/MainContainer";
import Header from "../components/minor/HeaderNav";
import { withAuth } from "../utils/services/ProtectecRoute";

function TechniciansPage() {
  const [techniciansData, setTechniciansData] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTechnician, setEditingTechnician] = useState<Technician | null>(
    null
  );
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
    loadTechnicians();
  }, []);

  const loadTechnicians = async () => {
    try {
      const technicians = await fetchTechnicians();
      setTechniciansData(technicians);
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

  const refreshTechnicians = async () => {
    setLoading(true);
    try {
      const technicians = await fetchTechnicians();
      setTechniciansData(technicians);
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

  const handleDelete = async (technicianToDelete: Technician) => {
    try {
      await deleteTechnician(technicianToDelete._id);
      // const updatedTechnicians = techniciansData.filter(
      //   (tech) => tech._id !== technicianToDelete._id
      // );
      // setTechniciansData(updatedTechnicians);
      await refreshTechnicians();
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Error",
        description: "Failed to delete technician",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handleUpdate = async () => {
    await refreshTechnicians();
  };

  return (
    <Flex>
      <Sidebar />
      <MainContent>
        <Box flex="1" p={{ base: 2, md: 4, xl: 8 }} mt={{ base: 10, xl: 4 }}>
          <Header />
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="sm">Technicians</Heading>
            <Button
              colorScheme="blue"
              leftIcon={<FaPlus />}
              onClick={onAddModalOpen}
              size="sm"
            >
              Add Technician
            </Button>
          </Flex>

          <TechniciansTable
            technicians={techniciansData}
            onEdit={(tech) => {
              setEditingTechnician(tech);
              onEditModalOpen();
            }}
            onDelete={handleDelete}
            isLoading={loading}
          />
        </Box>
      </MainContent>

      <AddTechnicianModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        onSuccess={async () => {
          await refreshTechnicians();
        }}
        initialData={{
          fullName: "",
          phoneNumber: "",
          email: "",
          workshop: "",
          specialty: "",
          team: "",
          status: "On Duty",
        }}
      />

      <EditTechnicianModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        onUpdate={handleUpdate}
        technician={editingTechnician}
      />
    </Flex>
  );
}

export default withAuth(TechniciansPage, ["workshopManager"]);
