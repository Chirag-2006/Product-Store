import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          textAlign={"center"}
          fontWeight={"bold"}
          bgClip={"text"}
          bgGradient={"linear(to-r, cyan.400,pink.400)"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}

          {products.length === 0 && (
            <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
              No products Found 😓{" "}
              <Link to={"/create"}>
                <Text
                  color={"cyan.600"}
                  _hover={{ textDecoration: "underline" }}
                  as={"span"}
                >
                  Create a new product
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
