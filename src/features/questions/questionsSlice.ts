// src/features/questions/questionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../types';

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: []
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    }
  }
});

export const { setQuestions, addQuestion, removeQuestion } =
  questionsSlice.actions;

export default questionsSlice.reducer;
