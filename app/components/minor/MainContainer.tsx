import { Box, Container } from "@chakra-ui/react";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      minH="100vh"
      ml={{ base: 0, xl: "250px" }}
      width={{ base: "100%", xl: "calc(100% - 250px)" }}
      bgColor="mainBg"
      color="gray.900"
    >
      <Container maxWidth="container.2xl">{children}</Container>
    </Box>
  );
}
