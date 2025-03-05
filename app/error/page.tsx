"use client";
import { Button, Heading, Text, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const router = useRouter();
  const handleRefresh = () => {
    router.push("/dashboard");
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      flexDirection="column"
      textAlign="center">
      <Icon as={FaExclamationTriangle} boxSize={16} color="red.500" />
      <Heading as="h1" size="xl" mt={4} color="gray.700">
        Oops! Something went wrong.
      </Heading>
      <Text mt={2} color="gray.600">
        {`   We couldn't process your request. Please try again later.`}
      </Text>
      <Button mt={6} size="sm" colorScheme="blue" onClick={handleRefresh}>
        Go Home
      </Button>
    </Flex>
  );
};

export default ErrorPage;
