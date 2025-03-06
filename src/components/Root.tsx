import {
  Box,
  Flex,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, Outlet, useRouter } from "@tanstack/react-router";

export const Root = () => {
  const router = useRouter();
  const bgColor = useColorModeValue("blue.500", "blue.600");
  const activeLinkColor = useColorModeValue("white", "white");
  const inactiveLinkColor = useColorModeValue(
    "whiteAlpha.800",
    "whiteAlpha.800"
  );

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem 2rem"
        bg={bgColor}
        color="white"
        boxShadow="sm"
      >
        <Flex align="center" mr={5}>
          <ChakraLink
            as={Link}
            to="/"
            fontSize="1.5rem"
            fontWeight="bold"
            color="white"
            textDecoration="none"
            transition="opacity 0.2s"
            _hover={{ opacity: 0.8 }}
          >
            Рецепти
          </ChakraLink>
        </Flex>
        <Flex gap={4}>
          <ChakraLink
            as={Link}
            to="/"
            color={
              router.state.location.pathname === "/"
                ? activeLinkColor
                : inactiveLinkColor
            }
            textDecoration="none"
            padding="0.5rem 1rem"
            borderRadius="md"
            transition="all 0.2s"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Всі рецепти
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/selected"
            color={
              router.state.location.pathname === "/selected"
                ? activeLinkColor
                : inactiveLinkColor
            }
            textDecoration="none"
            padding="0.5rem 1rem"
            borderRadius="md"
            transition="all 0.2s"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Вибрані рецепти
          </ChakraLink>
        </Flex>
      </Flex>

      <Box as="main" py={8}>
        <Outlet />
      </Box>
    </Box>
  );
};
