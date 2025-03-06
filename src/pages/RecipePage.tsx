import { useParams } from 'react-router-dom'
import {
	Container,
	Box,
	Image,
	Heading,
	Text,
	VStack,
	HStack,
	List,
	ListItem,
	Button,
	useToast,
	Divider,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { useSelectedRecipes } from '../hooks/useSelectedRecipes'

export const RecipePage = () => {
	const { id } = useParams<{ id: string }>()
	const { addRecipe, selectedRecipes } = useSelectedRecipes()
	const toast = useToast()

	const { data: recipeData } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => api.getRecipeById(id!),
		enabled: !!id,
	})

	const recipe = recipeData?.meals[0]
	const isSelected = selectedRecipes.some((r) => r.idMeal === recipe?.idMeal)

	if (!recipe) {
		return (
			<Container maxW='container.xl' py={8}>
				<Text>Рецепт не знайдено</Text>
			</Container>
		)
	}

	const handleSelect = () => {
		addRecipe(recipe)
		toast({
			title: 'Рецепт додано',
			description: `${recipe.strMeal} додано до вибраних рецептів`,
			status: 'success',
			duration: 3000,
			isClosable: true,
		})
	}

	const ingredients = Array.from({ length: 20 }, (_, i) => ({
		ingredient: recipe[`strIngredient${i + 1}` as keyof typeof recipe],
		measure: recipe[`strMeasure${i + 1}` as keyof typeof recipe],
	})).filter(({ ingredient }) => ingredient && ingredient.trim())

	return (
		<Container maxW='container.xl' py={8}>
			<VStack spacing={8} align='stretch'>
				<Box position='relative' height='400px'>
					<Image
						src={recipe.strMealThumb}
						alt={recipe.strMeal}
						objectFit='cover'
						width='100%'
						height='100%'
						borderRadius='lg'
					/>
					<Button
						position='absolute'
						top={4}
						right={4}
						colorScheme={isSelected ? 'red' : 'blue'}
						onClick={handleSelect}>
						{isSelected ? 'Вибрано' : 'Вибрати'}
					</Button>
				</Box>

				<VStack spacing={4} align='stretch'>
					<Heading>{recipe.strMeal}</Heading>

					<HStack spacing={4}>
						<Text color='gray.600'>
							Категорія: {recipe.strCategory}
						</Text>
						<Text color='gray.600'>Кухня: {recipe.strArea}</Text>
					</HStack>

					<Divider />

					<Box>
						<Heading size='md' mb={4}>
							Інгредієнти:
						</Heading>
						<List spacing={2}>
							{ingredients.map(
								({ ingredient, measure }, index) => (
									<ListItem key={index}>
										• {ingredient} - {measure}
									</ListItem>
								)
							)}
						</List>
					</Box>

					<Divider />

					<Box>
						<Heading size='md' mb={4}>
							Інструкції:
						</Heading>
						<Text whiteSpace='pre-line'>
							{recipe.strInstructions}
						</Text>
					</Box>

					{recipe.strYoutube && (
						<Box>
							<Heading size='md' mb={4}>
								Відео рецепт:
							</Heading>
							<Text>
								<a
									href={recipe.strYoutube}
									target='_blank'
									rel='noopener noreferrer'
									style={{ color: 'blue' }}>
									Переглянути на YouTube
								</a>
							</Text>
						</Box>
					)}
				</VStack>
			</VStack>
		</Container>
	)
}
