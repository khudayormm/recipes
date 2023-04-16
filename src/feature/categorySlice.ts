import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../types/MainTypes'

interface initialStateProps {
    category_id: number | null,
    subcategory_id: number | null,
    categories: Category[],
    subcategories: Category[]
}

const initialState: initialStateProps = {
    category_id : null,
    subcategory_id: null,
    categories: [],
    subcategories: []
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
        }
    }
})


export default categorySlice.reducer
export const { changeCategoryId, changeSubCategoryId, changeCategories, changeSubCategories } = categorySlice.actions