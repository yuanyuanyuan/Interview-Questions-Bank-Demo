// src/features/questions/questionsSlice.ts
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { Question } from '../../types';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../utils/fetchUtil';

// QuestionsResponse类型定义
export interface QuestionsResponse {
  questions: Question[];
  page: number;
  totalPages: number;
}

export interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | undefined;
}

const initialState: QuestionsState = {
  questions: JSON.parse(localStorage.getItem('questions') || '[]'),
  loading: false,
  error: undefined
};

// 定义async action
export const fetchQuestionsAsync = createAsyncThunk(
  'questions/fetchQuestions',
  async (payload, thunkAPI) => {
    const data: QuestionsResponse = await fetchWrapper('your-api-endpoint');
    return data.questions;
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      // 将更新后的状态保存到localStorage
      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
      // 将更新后的状态保存到localStorage
      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    removeQuestion: (state, action: PayloadAction<number>) => {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
      // 将更新后的状态保存到localStorage
      localStorage.setItem('questions', JSON.stringify(state.questions));
    },
    clearQuestions: (state) => {
      state.questions = [];
      // 清除localStorage中的questions
      localStorage.removeItem('questions');
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<QuestionsState>) => {
    // 使用builder.add来注册额外的reducer
    builder.addCase(fetchQuestionsAsync.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
      state.questions = action.payload;
      localStorage.setItem('questions', JSON.stringify(state.questions));
      state.loading = false;
    });
    builder.addCase(fetchQuestionsAsync.rejected, (state, action) => {
      console.log('action.payload-reject', action.error.message);
      state.error = action.error.message;
      state.loading = false;
    });
  }
});

export const { setQuestions, addQuestion, removeQuestion, clearQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;
