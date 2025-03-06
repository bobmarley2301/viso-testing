import {
  Box,
  Image,
  VStack,
  Button,
  useToast,
  HStack,
  Badge,
  useColorModeValue,
  Text,
  Icon,
  Link as ChakraLink,
  Tooltip,
} from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { useSelectedRecipes } from "../hooks/useSelectedRecipes";
import { Link } from "@tanstack/react-router";
import { StarIcon } from "@chakra-ui/icons";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  const { addRecipe, selectedRecipes, removeRecipe } = useSelectedRecipes();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const isSelected = selectedRecipes.some((r) => r.idMeal === recipe.idMeal);

  const handleSelect = () => {
    if (onSelect) {
      onSelect(recipe);
    } else {
      if (isSelected) {
        removeRecipe(recipe);
        toast({
          title: "Рецепт видалено",
          description: `${recipe.strMeal} видалено з вибраних рецептів`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        addRecipe(recipe);
        toast({
          title: "Рецепт додано",
          description: `${recipe.strMeal} додано до вибраних рецептів`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const recipeLink = `/recipe/${recipe.idMeal}`;

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      position="relative"
    >
      <ChakraLink
        as={Link}
        to={recipeLink}
        fontSize="1.25rem"
        fontWeight="bold"
        cursor="pointer"
        textDecoration="none"
        color={useColorModeValue("gray.800", "white")}
        _hover={{ color: "blue.500" }}
      >
        <Box position="relative" paddingTop="75%">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
            cursor="pointer"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Box>
      </ChakraLink>

      <VStack p={4} align="start" spacing={3}>
        <ChakraLink
          as={Link}
          to={recipeLink}
          fontSize="1.25rem"
          fontWeight="bold"
          cursor="pointer"
          textDecoration="none"
          color={useColorModeValue("gray.800", "white")}
          _hover={{ color: "blue.500" }}
        >
          {recipe.strMeal}
        </ChakraLink>

        <HStack spacing={2} flexWrap="wrap">
          <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
            {recipe.strCategory}
          </Badge>
          <Badge colorScheme="green" borderRadius="full" px={3} py={1}>
            {recipe.strArea}
          </Badge>
        </HStack>

        <Text color={textColor} fontSize="sm" noOfLines={2}>
          {recipe.strInstructions}
        </Text>

        <Tooltip
          label={isSelected ? "Видалити з вибраних" : "Додати до вибраних"}
          placement="top"
        >
          <Button
            colorScheme={isSelected ? "red" : "blue"}
            onClick={handleSelect}
            width="100%"
            leftIcon={<Icon as={StarIcon} />}
            variant={isSelected ? "solid" : "outline"}
            transition="all 0.2s"
            _hover={{
              transform: "translateY(-1px)",
              shadow: "md",
            }}
          >
            {isSelected ? "Вибрано" : "Вибрати"}
          </Button>
        </Tooltip>
      </VStack>
    </Box>
  );
};
