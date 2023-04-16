import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Recipe } from '../types/MainTypes'

interface initialStateProps {
    category_id: number | null,
    subcategory_id: number | null,
    categories: Category[],
    subcategories: Category[],
    recipes: Recipe[],
    loading: boolean
}

const initialState: initialStateProps = {
    category_id : null,
    subcategory_id: null,
    categories: [],
    subcategories: [],
    recipes: [],
    loading: false
}

const categorySlice = createSlice({
    initialState,
    name: 'category',
    reducers: {
        changeCategoryId: (state, action: PayloadAction<number | null>) => {
            state.category_id = action.payload
        },
        changeSubCategoryId: (state, action: PayloadAction<number | null>) => {
            state.subcategory_id = action.payload
        },
        changeCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        },
        changeSubCategories: (state, action: PayloadAction<Category[]>) => {
            state.subcategories = action.payload
        },
        changeRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.recipes = action.payload
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})


export default categorySlice.reducer
export const { changeCategoryId, changeSubCategoryId, changeCategories, changeSubCategories, changeRecipes, changeLoading } = categorySlice.actions