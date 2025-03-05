"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Button,
  useToast,
  ModalContent,
  HStack,
  useDisclosure,
  Icon,
  Text,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaClock, FaEdit, FaTimes } from "react-icons/fa";
import styled from "@emotion/styled";
import Sidebar from "../components/major/SidebarMenu";
import MainContent from "../components/minor/MainContainer";
import Header from "../components/minor/HeaderNav";
import { withAuth } from "../utils/services/ProtectecRoute";
import { Appointment } from "../utils/types/appointment";
import {
  deleteAppointment,
  fetchAppointments,
} from "../utils/services/appointments";
import { getCookie } from "cookies-next";
import { useAuth } from "../utils/services/context";
import { format, parseISO } from "date-fns";

const StyledTable = styled(Table)`
  th {
    background: #f7fafc;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: gray.600;
  }

  tr {
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background: #edf2f7;
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  }

  td {
    font-size: 0.875rem;
  }
`;

const StyledModal = styled(ModalContent)`
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.95),
    rgba(249, 250, 251, 0.95)
  );
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editStatus, setEditStatus] = useState("canceled");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const fetchedAppointments = await fetchAppointments(); // Fetch appointments
        setAppointments(fetchedAppointments); // Update state with fetched data
      } catch (error) {
        console.error("Failed to load appointments:", error);
      }
    };

    loadAppointments();
  }, []);

  const handleDelete = async (appointmentId: string) => {
    const token = getCookie("token");
    if (!token) {
      return;
    }
    try {
      await deleteAppointment(appointmentId, token);
      setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
      toast({
        title: "Appointment deleted.",
        status: "success",
        position: "top-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      toast({
        title: "Error deleting appointment.",
        status: "error",
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditDate(appointment.dateTime);
    setEditDescription("");
    setEditStatus("canceled");
    onOpen();
  };

  const handleStatusChange = (
    appointmentId: string,
    newStatus: "scheduled" | "completed" | "cancelled" | "approved"
  ) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );

    toast({
      title: `Appointment ${newStatus}`,
      status: newStatus === "cancelled" ? "error" : "success",
      duration: 3000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "green";
      case "cancelled":
        return "red";
      case "pending":
        return "orange";
      default:
        return "blue";
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = parseISO(dateTimeStr);
      return {
        date: format(date, "MMM dd, yyyy"),
        time: format(date, "hh:mm a"),
      };
    } catch (error) {
      return {
        date: "Invalid Date",
        time: "Invalid Time",
      };
    }
  };

  return (
    <>
      {appointments ? (
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
              overflowX="scroll">
              <Header />
              <Flex
                justify="space-between"
                gap={4}
                wrap="wrap"
                align="center"
                mb={6}>
                <Heading size="sm" color="gray.700">
                  Appointments
                </Heading>
                <HStack>
                  <Icon as={FaCalendarAlt} color="blue.500" />
                  <Text color="gray.600" fontSize="sm">
                    {`Today's Appointments`}:{" "}
                    {
                      appointments.filter((apt) => apt.status === "scheduled")
                        .length
                    }
                  </Text>
                </HStack>
              </Flex>
              <Box>
                <Box
                  overflowX="auto"
                  minWidth="1800px"
                  shadow="sm"
                  rounded="lg"
                  bg="white">
                  <StyledTable>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Customer</Th>
                        <Th>Service</Th>
                        <Th>Date & Time</Th>
                        <Th>Vehicle</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {appointments.map((appointment) => (
                        <Tr key={appointment.id}>
                          <Td>{appointment?.appointmentId}</Td>
                          <Td>
                            <Box>
                              <Text fontWeight="medium">
                                {appointment?.customerName}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {appointment.email}
                              </Text>
                            </Box>
                          </Td>
                          <Td>{appointment.service}</Td>
                          <Td>
                            <VStack align="start" spacing={0}>
                              <HStack>
                                <Icon
                                  as={FaCalendarAlt}
                                  color="blue.500"
                                  fontSize="xs"
                                />
                                <Text fontWeight="medium">
                                  {formatDateTime(appointment.dateTime).date}
                                </Text>
                              </HStack>
                              <HStack>
                                <Icon
                                  as={FaClock}
                                  color="blue.500"
                                  fontSize="xs"
                                />
                                <Text color="gray.600" fontSize="sm">
                                  {formatDateTime(appointment.dateTime).time}
                                </Text>
                              </HStack>
                            </VStack>
                          </Td>
                          <Td>{appointment?.vehicle}</Td>
                          <Td>
                            <Badge
                              colorScheme={getStatusColor(appointment.status)}
                              borderRadius="full"
                              variant="solid"
                              px={3}
                              py={1}>
                              {appointment.status}
                            </Badge>
                          </Td>
                          <Td>
                            <HStack spacing={2}>
                              <Button
                                size="sm"
                                colorScheme="green"
                                variant="ghost"
                                onClick={() =>
                                  handleStatusChange(appointment.id, "approved")
                                }>
                                Approve
                              </Button>
                              {appointment.status !== "cancelled" && (
                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  leftIcon={<FaTimes />}
                                  onClick={() => handleDelete(appointment.id)}>
                                  Cancel
                                </Button>
                              )}
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </StyledTable>
                </Box>
              </Box>
            </Box>
          </MainContent>
        </Flex>
      ) : (
        <Flex justify="center" align="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      )}
    </>
  );
}
export default withAuth(AppointmentsPage, ["workshopManager", "frontDesk"]);
