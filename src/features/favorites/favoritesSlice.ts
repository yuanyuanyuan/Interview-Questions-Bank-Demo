// src/features/favorites/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../types'; // 假设你有一个Question类型定义

export interface FavoritesState {
  ids: number[];
}

const initialState: FavoritesState = {
  ids: JSON.parse(localStorage.getItem('favorites') || '[]')
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      // 确保id不在数组中才添加
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.ids));
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.ids));
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      // 清空当前的收藏ID，然后设置新的收藏ID
      state.ids = action.payload;
      localStorage.setItem('favorites', JSON.stringify(action.payload));
    },
    clearFavorites: (state) => {
      state.ids = [];
      localStorage.removeItem('favorites');
    }
  }
});

export const { addFavorite, removeFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
