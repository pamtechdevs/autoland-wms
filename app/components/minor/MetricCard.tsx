import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MetricCardData } from "@/app/utils/types/metrics";

interface MetricCardProps extends MetricCardData {
  animationDelay?: number;
}

export default function MetricCard({
  title,
  value,
  change,
  isIncrease,
  icon: Icon,
  bgGradient,
}: MetricCardProps) {
  return (
    <Box
      zIndex={0}
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      p={{ base: 2, sm: 3, md: 6 }}
      borderRadius={{ base: "lg", md: "2xl" }}
      bg="white"
      boxShadow="sm"
      position="relative"
      overflow="hidden"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      width="100%"
      minH={{ base: "80px", md: "120px" }}
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        width="100%"
        bgGradient={bgGradient}
        opacity={0.1}
        borderRadius="inherit"
      />

      <Flex justify="space-between" align="center" mb={{ base: 1, md: 4 }}>
        <Box
          p={{ base: 1.5, sm: 2, md: 4 }}
          borderRadius={{ base: "md", md: "xl" }}
          bg={bgGradient}
          color="gray.600"
          boxShadow="md"
        >
          <Icon size={12} />
        </Box>
        {change && (
          <Badge
            colorScheme={isIncrease ? "green" : "red"}
            borderRadius="full"
            px={{ base: 1.5, md: 3 }}
            py={{ base: 0.5, md: 1 }}
            display="flex"
            alignItems="center"
            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
            fontWeight="bold"
          >
            {isIncrease ? <FaCaretUp /> : <FaCaretDown />}
            {change}
          </Badge>
        )}
      </Flex>

      <Text
        color="gray.500"
        fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
        mb={{ base: 0.5, md: 2 }}
        fontWeight="medium"
      >
        {title}
      </Text>
      <Text
        color="gray.600"
        fontSize={{ base: "sm", sm: "md", md: "lg" }}
        fontWeight="bold"
        lineHeight="shorter"
      >
        {value}
      </Text>
    </Box>
  );
}
