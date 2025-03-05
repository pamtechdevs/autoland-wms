import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Box,
  Heading,
  IconButton,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { SubscriptionTier } from "@/app/utils/types/member";

// Use the imported SubscriptionTier type
interface Service {
  name: string;
  allowedTimes: number;
  _id?: string;
}

interface Props {
  tier?: SubscriptionTier;
  onSubmit: (tier: SubscriptionTier) => void;
  onCancel: () => void;
}

export const SubscriptionTierFormModal = ({
  tier,
  onSubmit,
  onCancel,
}: Props) => {
  const [formData, setFormData] = useState<SubscriptionTier>({
    tier: tier?.tier || "",
    price: tier?.price || 0,
    serviceFrequencyPerYear: tier?.serviceFrequencyPerYear || 1,
    services: tier?.services || [],
    _id: tier?._id,
    createdAt: tier?.createdAt,
    updatedAt: tier?.updatedAt,
  });

  const [newService, setNewService] = useState<Service>({
    name: "",
    allowedTimes: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "serviceFrequencyPerYear"
          ? Number(value)
          : value,
    }));
  };

  const handleAddService = () => {
    if (newService.name && newService.allowedTimes) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, { ...newService }],
      }));
      setNewService({ name: "", allowedTimes: 1 });
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tier || !formData.price) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel>Tier Name</FormLabel>
          <Select
            name="tier"
            value={formData.tier}
            onChange={handleInputChange}
            outline="1px solid #333"
          >
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
                fontSize: "14px",
              }}
              value="Platinum"
            >
              Platinum
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
                fontSize: "14px",
              }}
              value="Diamond"
            >
              Diamond
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
                fontSize: "14px",
              }}
              value="Gold"
            >
              Gold
            </option>
            <option
              style={{
                backgroundColor: "#eee",
                color: "gray.500",
                fontSize: "14px",
              }}
              value="Silver"
            >
              Silver
            </option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price (₦)</FormLabel>
          <NumberInput
            outline="1px solid #333"
            borderRadius="5px"
            min={0}
            value={formData.price}
          >
            <NumberInputField name="price" onChange={handleInputChange} />
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Service Frequency (per year)</FormLabel>
          <NumberInput
            outline="1px solid #333"
            borderRadius="5px"
            min={1}
            value={formData.serviceFrequencyPerYear}
          >
            <NumberInputField
              name="serviceFrequencyPerYear"
              onChange={handleInputChange}
            />
          </NumberInput>
        </FormControl>

        <Box>
          <Heading size="sm" mb={4}>
            Services
          </Heading>
          <VStack spacing={4}>
            {formData.services.map((service, index) => (
              <HStack key={service._id || index} width="full">
                <Text flex={1}>{service.name}</Text>
                <Text>{service.allowedTimes}x</Text>
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Remove service"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleRemoveService(index)}
                />
              </HStack>
            ))}

            <HStack width="full">
              <Input
                outline="1px solid #333"
                placeholder="Service name"
                _placeholder={{ color: "gray.500" }}
                value={newService.name}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <NumberInput min={1} value={newService.allowedTimes} maxW="100px">
                <NumberInputField
                  placeholder="Times"
                  outline="1px solid #333"
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      allowedTimes: Number(e.target.value),
                    }))
                  }
                />
              </NumberInput>
              <Button
                leftIcon={<FaPlus />}
                size="sm"
                onClick={handleAddService}
                colorScheme="blue"
              >
                Add
              </Button>
            </HStack>
          </VStack>
        </Box>

        <HStack justify="flex-end" spacing={4}>
          <Button colorScheme="red" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit">
            {tier ? "Update Tier" : "Create Tier"}
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
