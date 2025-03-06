import {
  Box,
  Image,
  VStack,
  Button,
  useToast,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { useSelectedRecipes } from "../hooks/useSelectedRecipes";
import { Link } from "@tanstack/react-router";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  const { addRecipe, selectedRecipes } = useSelectedRecipes();
  const toast = useToast();

  const isSelected = selectedRecipes.some((r) => r.idMeal === recipe.idMeal);

  const handleSelect = () => {
    if (onSelect) {
      onSelect(recipe);
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
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
    >
      <Link to="/recipe/$recipeId" params={{ recipeId: recipe.idMeal }}>
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          height="200px"
          width="100%"
          objectFit="cover"
          cursor="pointer"
        />
      </Link>

      <VStack p={4} align="start" spacing={2}>
        <Link
          to="/recipe/$recipeId"
          params={{ recipeId: recipe.idMeal }}
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          {recipe.strMeal}
        </Link>

        <HStack spacing={2}>
          <Badge colorScheme="blue">{recipe.strCategory}</Badge>
          <Badge colorScheme="green">{recipe.strArea}</Badge>
        </HStack>

        <Button
          colorScheme={isSelected ? "red" : "blue"}
          onClick={handleSelect}
          width="100%"
        >
          {isSelected ? "Вибрано" : "Вибрати"}
        </Button>
      </VStack>
    </Box>
  );
};
