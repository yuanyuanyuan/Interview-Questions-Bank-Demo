// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, {
  FavoritesState
} from '../features/favorites/favoritesSlice';
import questionsReducer, {
  QuestionsState
} from '../features/questions/questionsSlice';

// 定义 RootState 类型，它包含了所有的reducer
export interface RootState {
  favorites: FavoritesState;
  questions: QuestionsState;
}

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    questions: questionsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
