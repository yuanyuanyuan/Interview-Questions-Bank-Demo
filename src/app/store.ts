// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, {
  FavoritesState
} from '../features/favorites/favoritesSlice';
import questionsReducer, {
  QuestionsState,
  setQuestions
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

// 从localStorage初始化questions状态
const savedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
if (savedQuestions.length) {
  store.dispatch(setQuestions(savedQuestions));
}

export type AppDispatch = typeof store.dispatch;
