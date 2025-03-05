import { SubscriptionTier } from "@/app/utils/types/member";
import {
  Box,
  VStack,
  Heading,
  Text,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

interface Props {
  tier: SubscriptionTier;
}

export const SubscriptionTierCard = ({ tier }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Map tier name to color
  const getColorScheme = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case "platinum":
        return "purple";
      case "diamond":
        return "blue";
      case "gold":
        return "yellow";
      case "silver":
        return "blue";
      default:
        return "teal";
    }
  };

  const colorScheme = getColorScheme(tier.tier);

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p={6}
        bg={`${colorScheme}.50`}
        borderColor={`${colorScheme}.200`}
        position="relative"
        transition="all 0.2s"
        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
      >
        <Flex justify="space-between" align="start" mb={4}>
          <Badge
            colorScheme={colorScheme}
            fontSize="sm"
            variant="solid"
            px={3}
            py={1}
            borderRadius="full"
          >
            {tier.tier}
          </Badge>
          {/* <Flex gap={2}>
            <IconButton
              size="sm"
              icon={<FaEdit />}
              aria-label="Edit tier"
              variant="ghost"
              colorScheme={colorScheme}
              onClick={() => onEdit(tier)}
            />
            <IconButton
              size="sm"
              icon={<FaTrash />}
              aria-label="Delete tier"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete(tier._id)}
            />
          </Flex> */}
        </Flex>

        <VStack align="stretch" spacing={4}>
          <Heading size="lg" color={`${colorScheme}.500`}>
            ₦{tier.price.toLocaleString()}
            <Text as="span" fontSize="sm" color="gray.500">
              /year
            </Text>
          </Heading>

          <VStack align="stretch" spacing={2}>
            <Text fontWeight="medium">Features:</Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={FaCheck} color={`${colorScheme}.500`} />
                {tier.serviceFrequencyPerYear} services per year
              </ListItem>
              {tier.services.map((service) => (
                <ListItem key={service._id}>
                  <ListIcon as={FaCheck} color={`${colorScheme}.500`} />
                  {service.name} ({service.allowedTimes}x)
                </ListItem>
              ))}
            </List>
          </VStack>

          <Button colorScheme={colorScheme} onClick={onOpen} size="sm">
            View Details
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader color="gray.800" bgColor="gray.100">
            {tier.tier} Tier Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor="gray.100" color="gray.800" pb={6}>
            <VStack align="stretch" spacing={6}>
              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Subscription Details
                </Text>
                <List spacing={3}>
                  <ListItem>
                    <HStack justify="space-between">
                      <Text color="gray.600">Price</Text>
                      <Text fontWeight="medium">
                        ₦{tier.price.toLocaleString()}/year
                      </Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack justify="space-between">
                      <Text color="gray.600">Service Frequency</Text>
                      <Text fontWeight="medium">
                        {tier.serviceFrequencyPerYear} times/year
                      </Text>
                    </HStack>
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Included Services
                </Text>
                <List spacing={3}>
                  {tier.services.map((service) => (
                    <ListItem key={service._id}>
                      <HStack justify="space-between">
                        <Text color="gray.600">{service.name}</Text>
                        <Badge variant="solid" colorScheme={colorScheme}>
                          {service.allowedTimes}x
                        </Badge>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Text fontWeight="semibold" mb={2}>
                  Terms and Conditions
                </Text>
                <List spacing={2} styleType="disc" pl={4}>
                  <ListItem>
                    <Text fontSize="sm" color="gray.600">
                      Subscription is valid for one year from the date of
                      purchase
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="sm" color="gray.600">
                      Services must be scheduled in advance
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text fontSize="sm" color="gray.600">
                      Unused services cannot be carried forward
                    </Text>
                  </ListItem>
                </List>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
