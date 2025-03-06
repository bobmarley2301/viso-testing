import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Input,
  Select,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { RecipeCard } from "../components/RecipeCard";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 12;

export const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: areasData } = useQuery({
    queryKey: ["areas"],
    queryFn: api.getAllAreas,
  });

  const { data: ingredientsData } = useQuery({
    queryKey: ["ingredients"],
    queryFn: api.getAllIngredients,
  });

  const { data: recipesData } = useQuery({
    queryKey: ["recipes", debouncedSearch, selectedArea, selectedIngredient],
    queryFn: async () => {
      if (debouncedSearch) {
        return api.searchRecipes(debouncedSearch);
      }
      if (selectedArea) {
        return api.getRecipesByArea(selectedArea);
      }
      if (selectedIngredient) {
        return api.getRecipesByIngredient(selectedIngredient);
      }
      // TODO: Remove this
      const randomMeals = await Promise.all(
        Array(14)
          .fill(null)
          .map(() => api.getRandomMeal())
      );
      return {
        meals: randomMeals.flatMap((meal) => meal.meals || []),
      };
    },
  });

  const recipes = useMemo(() => {
    return recipesData?.meals || [];
  }, [recipesData]);

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = useMemo(() => {
    return recipes.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [recipes, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedArea("");
    setSelectedIngredient("");
    setCurrentPage(1);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
    setSearchQuery("");
    setSelectedIngredient("");
    setCurrentPage(1);
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIngredient(e.target.value);
    setSearchQuery("");
    setSelectedArea("");
    setCurrentPage(1);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading>Рецепти</Heading>

        <Box width="100%">
          <Input
            placeholder="Пошук рецептів..."
            value={searchQuery}
            onChange={handleSearch}
            size="lg"
          />
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <Select
            placeholder="Виберіть кухню"
            value={selectedArea}
            onChange={handleAreaChange}
          >
            {areasData?.meals?.map((area) => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Виберіть інгредієнт"
            value={selectedIngredient}
            onChange={handleIngredientChange}
          >
            {ingredientsData?.meals?.map((ingredient) => (
              <option
                key={ingredient.strIngredient}
                value={ingredient.strIngredient}
              >
                {ingredient.strIngredient}
              </option>
            ))}
          </Select>
        </Grid>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          width="100%"
        >
          {paginatedRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </Grid>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </VStack>
    </Container>
  );
};
