import {
	Container,
	VStack,
	Heading,
	Grid,
	Box,
	Text,
	List,
	ListItem,
	Button,
	useToast,
	Divider,
} from '@chakra-ui/react'
import { useSelectedRecipes } from '../hooks/useSelectedRecipes'
import { RecipeCard } from '../components/RecipeCard'

export const SelectedRecipesPage = () => {
	const { selectedRecipes, removeRecipe, getIngredients } =
		useSelectedRecipes()
	const toast = useToast()

	const handleRemove = (recipe: Recipe) => {
		removeRecipe(recipe)
		toast({
			title: 'Рецепт видалено',
			description: `${recipe.strMeal} видалено з вибраних рецептів`,
			status: 'info',
			duration: 3000,
			isClosable: true,
		})
	}

	if (selectedRecipes.length === 0) {
		return (
			<Container maxW='container.xl' py={8}>
				<VStack spacing={4}>
					<Heading>Мої вибрані рецепти</Heading>
					<Text>У вас поки немає вибраних рецептів</Text>
				</VStack>
			</Container>
		)
	}

	return (
		<Container maxW='container.xl' py={8}>
			<VStack spacing={8} align='stretch'>
				<Heading>Мої вибрані рецепти</Heading>

				<Grid
					templateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
						xl: 'repeat(4, 1fr)',
					}}
					gap={6}>
					{selectedRecipes.map((recipe) => (
						<RecipeCard
							key={recipe.idMeal}
							recipe={recipe}
							onSelect={handleRemove}
						/>
					))}
				</Grid>

				<Divider />

				<Box>
					<Heading size='md' mb={4}>
						Список інгредієнтів:
					</Heading>
					<List spacing={2}>
						{getIngredients().map((ingredient, index) => (
							<ListItem key={index}>
								• {ingredient.name} - {ingredient.measure}
							</ListItem>
						))}
					</List>
				</Box>

				<Divider />

				<Box>
					<Heading size='md' mb={4}>
						Інструкції по приготуванню:
					</Heading>
					{selectedRecipes.map((recipe, index) => (
						<Box key={recipe.idMeal} mb={6}>
							<Heading size='sm' mb={2}>
								{recipe.strMeal}
							</Heading>
							<Text whiteSpace='pre-line'>
								{recipe.strInstructions}
							</Text>
						</Box>
					))}
				</Box>
			</VStack>
		</Container>
	)
}
