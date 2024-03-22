// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, {
  FavoritesState
} from '../features/favorites/favoritesSlice';
import questionsReducer from '../features/questions/questionsSlice';
import { Question } from '../types';

// 定义 RootState 类型，它包含了所有的reducer
export interface RootState {
  favorites: FavoritesState;
  questions: Question[];
}

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    questionsReducer: questionsReducer
  }
});
