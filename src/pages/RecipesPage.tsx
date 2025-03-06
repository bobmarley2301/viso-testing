import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Input,
  Select,
  VStack,
  Heading,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
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

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { data: areasData, isLoading: isLoadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: api.getAllAreas,
  });

  const { data: ingredientsData, isLoading: isLoadingIngredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: api.getAllIngredients,
  });

  const { data: recipesData, isLoading: isLoadingRecipes } = useQuery({
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
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" size="xl" mb={8}>
          Рецепти
        </Heading>

        <Box width="100%">
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Пошук рецептів..."
              value={searchQuery}
              onChange={handleSearch}
              bg={bgColor}
              borderColor={borderColor}
              _hover={{ borderColor: "blue.500" }}
              _focus={{ borderColor: "blue.500" }}
            />
          </InputGroup>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <Skeleton isLoaded={!isLoadingAreas}>
            <Select
              placeholder="Виберіть кухню"
              value={selectedArea}
              onChange={handleAreaChange}
              bg={bgColor}
              borderColor={borderColor}
              _hover={{ borderColor: "blue.500" }}
              _focus={{ borderColor: "blue.500" }}
            >
              {areasData?.meals?.map((area) => (
                <option key={area.strArea} value={area.strArea}>
                  {area.strArea}
                </option>
              ))}
            </Select>
          </Skeleton>

          <Skeleton isLoaded={!isLoadingIngredients}>
            <Select
              placeholder="Виберіть інгредієнт"
              value={selectedIngredient}
              onChange={handleIngredientChange}
              bg={bgColor}
              borderColor={borderColor}
              _hover={{ borderColor: "blue.500" }}
              _focus={{ borderColor: "blue.500" }}
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
          </Skeleton>
        </Grid>

        {isLoadingRecipes ? (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
            width="100%"
          >
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} height="300px" borderRadius="lg" />
              ))}
          </Grid>
        ) : recipes.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            Рецептів не знайдено
          </Text>
        ) : (
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
        )}

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
