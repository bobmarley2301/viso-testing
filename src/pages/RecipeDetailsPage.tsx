import { useParams } from "@tanstack/react-router";
import {
  Container,
  VStack,
  Heading,
  Image,
  Text,
  Grid,
  Box,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useSelectedRecipes } from "../hooks/useSelectedRecipes";
import { Recipe } from "../types/recipe";

export const RecipeDetailsPage = () => {
  const { recipeId } = useParams({ from: "/recipe/$recipeId" });
  const { addRecipe, removeRecipe, selectedRecipes } = useSelectedRecipes();
  const toast = useToast();

  const { data: recipeData } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => api.getRecipeById(recipeId),
  });

  const recipe = recipeData?.meals?.[0];
  const isSelected = selectedRecipes.some((r) => r.idMeal === recipe?.idMeal);

  if (!recipe) {
    return (
      <Container maxW="container.xl" py={8}>
        <Heading>Рецепт не знайдено</Heading>
      </Container>
    );
  }

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith("strIngredient") && value)
    .map(([key, value]) => {
      const measureKey = `strMeasure${key.slice(13)}` as keyof Recipe;
      return {
        ingredient: value,
        measure: recipe[measureKey],
      };
    });

  const handleToggleSelect = () => {
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
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
          <Box>
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              borderRadius="lg"
              width="100%"
              objectFit="cover"
            />
          </Box>

          <VStack align="start" spacing={4}>
            <Heading>{recipe.strMeal}</Heading>
            <Text color="gray.600">Категорія: {recipe.strCategory}</Text>
            <Text color="gray.600">Кухня: {recipe.strArea}</Text>
            <Text color="gray.600">Інструкції: {recipe.strInstructions}</Text>
            <Box
              as="button"
              onClick={handleToggleSelect}
              px={4}
              py={2}
              bg={isSelected ? "red.500" : "blue.500"}
              color="white"
              borderRadius="md"
              _hover={{
                bg: isSelected ? "red.600" : "blue.600",
              }}
            >
              {isSelected ? "Видалити з вибраних" : "Додати до вибраних"}
            </Box>
          </VStack>
        </Grid>

        <Box>
          <Heading size="md" mb={4}>
            Інгредієнти
          </Heading>
          <List spacing={2}>
            {ingredients.map((item, index) => (
              <ListItem key={index}>
                {item.measure} {item.ingredient}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};
