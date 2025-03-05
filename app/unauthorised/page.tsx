"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}>
      <Box
        bg={bgColor}
        py="8"
        px={{ base: "4", md: "10" }}
        shadow="base"
        rounded={{ sm: "lg" }}>
        <VStack spacing="6" align="center">
          <Icon as={FaLock} w={12} h={12} color="red.800" />
          <Heading size="xl" color="red.500">
            Access Denied
          </Heading>
          <Text color={textColor} textAlign="center" fontSize="lg">
            {`  You don't have permission to access this page. Please contact your
            administrator if you think this is a mistake.`}
          </Text>
          <Button
            colorScheme="blue"
            size="sm"
            width="full"
            onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
