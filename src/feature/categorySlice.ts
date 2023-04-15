import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialStateProps {
    category_id: number | null,
    subcategory_id: number | null
}

const initialState: initialStateProps = {
    category_id : null,
    subcategory_id: null
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
        }
    }
})


export default categorySlice.reducer
export const { changeCategoryId, changeSubCategoryId } = categorySlice.actions