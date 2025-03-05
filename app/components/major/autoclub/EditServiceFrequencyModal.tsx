import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentFrequency: number;
  onSubmit: (frequency: number) => void;
  isLoading?: boolean;
}

export const EditServiceFrequencyModal = ({
  isOpen,
  onClose,
  currentFrequency,
  onSubmit,
  isLoading,
}: Props) => {
  const [frequency, setFrequency] = useState(currentFrequency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(frequency);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bgColor="black">
        <ModalHeader>Edit Service Frequency</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Service Frequency (per year)</FormLabel>
                <NumberInput
                  min={0}
                  value={frequency}
                  onChange={(_, value) => setFrequency(value)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <HStack spacing={3} alignSelf="flex-end" pb={4}>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                  Save Changes
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
