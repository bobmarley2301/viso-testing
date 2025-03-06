export interface Recipe {
	idMeal: string
	strMeal: string
	strDrinkAlternate: string | null
	strCategory: string
	strArea: string
	strInstructions: string
	strMealThumb: string
	strTags: string | null
	strYoutube: string
	[key: `strIngredient${number}`]: string
	[key: `strMeasure${number}`]: string
	strSource: string
	strImageSource: string | null
	strCreativeCommonsConfirmed: string | null
	dateModified: string | null
}

export interface RecipeResponse {
	meals: Recipe[] | null
}

export interface Ingredient {
	name: string
	measure: string
}
