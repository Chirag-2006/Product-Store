import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  VStack,
  Input,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();

  const handleUpdateProduct = async () => {
    const response = await updateProduct(product._id, updatedProduct);

    if (response.success) {
      toast({
        title: "Success",
        status: "success",
        description: response.message,
        duration: 3000,
        isClosable: true,
      });
      onUpdateClose();
    } else {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response.success) {
      toast({
        title: "Success",
        status: "success",
        description: response.message,
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  return (
    <Box
      maxW={{ base: "100%", md: "500px" }} // Responsive width
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="transform 0.5s"
      _hover={{ transform: "scale(1.05)" }}
      bg={bg}
    >
      {/* Image Box */}
      <Box onClick={onImageOpen} cursor="pointer">
        <Image
          src={product.image}
          alt={product.name}
          w="100%"
          h={{ base: "200px", md: "200px" }} // Responsive height
          objectFit="cover"
        />
      </Box>

      <Stack p="3" spacing="2">
        <Text
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="short"
          noOfLines={2}
          color={"cyan.500"}
        >
          {product.name}
        </Text>

        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onUpdateOpen}
            colorScheme="blue"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Stack>

      {/* Update Product Modal */}
      <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Image"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button onClick={onUpdateClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Image Modal */}
      <Modal isOpen={isImageOpen} onClose={onImageClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="transparent" boxShadow="none">
          <Center minH={{ base: "40vh", md: "80vh" }}>
            <Box
              onClick={(e) => e.stopPropagation()}
              p={2}
              bgGradient={"linear(to-r, cyan.400,pink.400)"}
              borderRadius="md"
            >
              {/* Image */}
              <Image
                src={product.image}
                alt={product.name}
                minH="100%"
                minW="100%"
                objectFit="contain"
                borderRadius="md"
              />

              {/* Close Button */}
              <Button mt={4} colorScheme="blue" w="full" onClick={onImageClose}>
                Close
              </Button>
            </Box>
          </Center>
          {/* <ModalCloseButton color="white" /> */}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
