"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import logoBlue from "../../../assets/logoWhite.webp";
import Sidebar from "../../../components/major/SidebarMenu";
import Header from "../../../components/minor/HeaderNav";
import { withAuth } from "@/app/utils/services/ProtectecRoute";
import { generateInvoice } from "@/app/utils/services/estimate";
import { InvoiceData } from "@/app/utils/types/invoice";

const FormContainer = styled(Box)`
  background: white;
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
`;

function InvoicePage({ params }: { params: { id: string } }) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const disclaimers = [
    "1. Estimates must be customer-approved within seven (7) days, else they will be removed from the company premises.",
    "2. Upon estimate approval, make an 80% down payment, or incure daily ₦1,000 demurrage charges after seven (7)days.",
    "3. Vehicles left unclaimed for six (6) months will be auctioned without further notice.",
    "4. If additional spares are required during repairs, a separate estimate will be generated.",
    "5. We have a non-refund policy which states that unused funds may only be applied to subsequent repairs.",
    "6. Accepting our estimate gives us permission to utilize your car in promotional digital and social media content.",
  ];

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const data = await generateInvoice(params.id);
        setInvoiceData(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceData();
  }, [params.id]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!invoiceData) {
    return <Box>No invoice data found</Box>;
  }

  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={{ base: 4, md: 8 }}>
        <Header />
        <FormContainer>
          <VStack align="stretch" spacing={6}>
            {/* Logo and Header */}
            <Flex justifyContent="center" alignContent="center">
              <Image src={logoBlue} alt="logo" />
            </Flex>
            <Box my={6}>
              <Heading fontSize="xl" fontWeight="bold">
                INVOICE
              </Heading>
            </Box>

            {/* Customer Info */}
            <Box border="1px" borderColor="gray.200">
              <Table variant="simple" size="sm">
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold" width="200px">
                      Staff Name:
                    </Td>
                    <Td>{invoiceData?.staffName}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Customer Name:</Td>
                    <Td>{invoiceData?.customerName}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Date:</Td>
                    <Td>
                      {new Date(invoiceData?.date || "").toLocaleDateString()}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Contact:</Td>
                    <Td>{invoiceData?.contactPerson}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            {/* Vehicle Details */}
            <Box border="1px" borderColor="gray.200">
              <Text p={2} fontWeight="bold" bg="gray.50">
                VEHICLE DETAILS
              </Text>
              <Table variant="simple" size="sm">
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Model Make:</Td>
                    <Td>{invoiceData?.vehicleDetails.modelMake}</Td>
                    <Td fontWeight="bold">Year:</Td>
                    <Td>{invoiceData?.vehicleDetails.year}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Chassis No:</Td>
                    <Td>{invoiceData?.vehicleDetails.chassisNo}</Td>
                    <Td fontWeight="bold">Plate No:</Td>
                    <Td>{invoiceData?.vehicleDetails.plateNo}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Mileage:</Td>
                    <Td>
                      {invoiceData?.vehicleDetails.mileage.toLocaleString()} km
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            {/* Parts and Services Table */}
            <Table
              variant="simple"
              size="sm"
              border="1px"
              borderColor="gray.200"
            >
              <Thead bg="gray.50">
                <Tr>
                  <Th>Description</Th>
                  <Th isNumeric>Qty</Th>
                  <Th isNumeric>Unit Price (₦)</Th>
                  <Th isNumeric>Amount (₦)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoiceData?.partsAndServices.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.description}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>{item.unitPrice.toLocaleString()}</Td>
                    <Td isNumeric>{item.amount.toLocaleString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Totals */}
            <Box alignSelf="flex-end">
              <HStack spacing={8} justify="flex-end">
                <Text fontWeight="bold">Total Excl. VAT</Text>
                <Text>
                  ₦{invoiceData?.totalSummary.totalExclVAT.toLocaleString()}
                </Text>
              </HStack>
              <HStack spacing={8} justify="flex-end">
                <Text fontWeight="bold">VAT</Text>
                <Text>₦{invoiceData?.totalSummary.vat}</Text>
              </HStack>
              <HStack spacing={8} justify="flex-end">
                <Text fontWeight="bold">Total Incl. VAT</Text>
                <Text>₦{invoiceData?.totalSummary.totalInclVAT}</Text>
              </HStack>
            </Box>

            {/* Disclaimers */}
            <Box>
              <Text fontWeight="bold" mb={2}>
                DISCLAIMER:
              </Text>
              {disclaimers.map((disclaimer, index) => (
                <Text key={index} fontSize="sm">
                  {disclaimer}
                </Text>
              ))}
            </Box>

            {/* Footer */}
            <Box textAlign="center" mt={4}>
              <Text fontWeight="bold">FOR YOUR NEXT SERVICE APPOINTMENT</Text>
              <Text>
                PLEASE CALL: 08115004000 or send a message to @pamtechgroup on
                social media
              </Text>
              <Text fontWeight="bold" mt={4}>
                Extra Care for your car
              </Text>
              <Text fontWeight="bold">Extra Mile for you</Text>
            </Box>
          </VStack>
        </FormContainer>
      </Box>
    </Flex>
  );
}

export default withAuth(InvoicePage);
