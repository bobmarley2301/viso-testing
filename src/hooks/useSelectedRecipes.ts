import { create } from 'zustand'
import { Recipe } from '../types/recipe'

interface SelectedRecipesStore {
	selectedRecipes: Recipe[]
	addRecipe: (recipe: Recipe) => void
	removeRecipe: (recipe: Recipe) => void
	getIngredients: () => { name: string; measure: string }[]
}

export const useSelectedRecipes = create<SelectedRecipesStore>()(
	(set, get) => ({
		selectedRecipes: [],

		addRecipe: (recipe) =>
			set((state) => ({
				selectedRecipes: [...state.selectedRecipes, recipe],
			})),

		removeRecipe: (recipe) =>
			set((state) => ({
				selectedRecipes: state.selectedRecipes.filter(
					(r) => r.idMeal !== recipe.idMeal
				),
			})),

		getIngredients: () => {
			const { selectedRecipes } = get()
			const ingredientsMap = new Map<string, string>()

			selectedRecipes.forEach((recipe) => {
				Object.entries(recipe)
					.filter(
						([key, value]) =>
							key.startsWith('strIngredient') && value
					)
					.forEach(([key, value]) => {
						const measureKey = `strMeasure${key.slice(13)}`
						const measure = recipe[
							measureKey as keyof Recipe
						] as string
						ingredientsMap.set(value as string, measure)
					})
			})

			return Array.from(ingredientsMap.entries()).map(
				([name, measure]) => ({
					name,
					measure,
				})
			)
		},
	})
)
