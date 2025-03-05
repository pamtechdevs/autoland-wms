import theme from "@/app/theme";
import { Box } from "@chakra-ui/react";

export default function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      background={theme.glassBg}
      backdropFilter="blur(10px)"
      borderRadius="xl"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.4)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      padding="2rem"
      maxW="450px"
      width="100%"
    >
      {children}
    </Box>
  );
}
