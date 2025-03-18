"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Box, Input, Button, Heading, Flex, useToast, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import bgLogin from "./assets/login_bg.jpg";
import GlassCard from "./components/minor/GlassCard";
import { useRouter } from "next/navigation";
import { authService } from "./utils/services/auth";
import { setCookie, } from "cookies-next";
import { useAuth } from "./utils/services/context";

export default function Home() {
  const { fetchUserData } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      setCookie("token", response.token, {
        maxAge: 24 * 60 * 60, // 24hours
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Debug log

      fetchUserData(); // Add this line

      toast({
        title: "Success",
        description: "Login successful",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bgImage={bgLogin.src}
      bgSize="cover"
      bgRepeat="no-repeat">
      <GlassCard>
        <form onSubmit={handleLogin}>
          <Flex flexDir="column" gap={6} align="stretch">
            <Heading color="white" size="md" textAlign="center" mb={2}>
              Login
            </Heading>

            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              type="email"
              bg="transparent"
              color="white"
              border="1px solid"
              borderColor="gray.200"
              required
            />

            <InputGroup>
              <Input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                bg="transparent"
                color="white"
                border="1px solid"
                borderColor="gray.200"
                required
                pr="4.5rem"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  icon={
                    showPassword ? (
                      <FaEyeSlash color="white" />
                    ) : (
                      <FaEye color="white" />
                    )
                  }
                />
              </InputRightElement>
            </InputGroup>

            <Button
              type="submit"
              colorScheme="blue"
              bgColor="primaryBlue"
              color="gray.300"
              size="md"
              borderRadius="lg"
              w="100%"
              mt={4}
              isLoading={isLoading}
              loadingText="Signing in...">
              Sign In
            </Button>
          </Flex>
        </form>
      </GlassCard>
    </Box>
  );
}
