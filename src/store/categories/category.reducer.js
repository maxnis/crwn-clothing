import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  redusers: {
    setCategories(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
