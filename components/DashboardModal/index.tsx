import { Button, ButtonProps, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

type IProps = {
    label: string;
    placeholderA: string;
    placeholderB: string;
  onConfirm: (a: string, b: string) => void;
} & ButtonProps

const DashboardModal = ({
    label, placeholderA, placeholderB, onConfirm, ...rest
}: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [a, setA] = useState('');
    const [b, setB] = useState('');

  return (
    <>
      <Button onClick={onOpen} {...rest}>{label}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input mb="5" placeholder={placeholderA} onChange={(e) => setA(e.target.value)} />
          <Input placeholder={placeholderB} onChange={(e) => setB(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => {onConfirm(a,b); onClose()}}>{label}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DashboardModal;
