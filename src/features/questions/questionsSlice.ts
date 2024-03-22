// src/features/questions/questionsSlice.ts
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { Question } from '../../types';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

type ApiError = {
  message: string;
  response: Response; // 假设response是一个有效的Response类型
};
type CustomSerializedError = SerializedError & ApiError;

export interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | undefined;
}

const initialState: QuestionsState = {
  questions: [],
  loading: false,
  error: undefined
};

// 定义async action
export const fetchQuestionsAsync = createAsyncThunk(
  'questions/fetchQuestions',
  async (payload, thunkAPI) => {
    const response = await fetch('your-api-endpoint');
    const data = await response.json();
    return data;
  }
);

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
    },
    clearQuestions: (state) => {
      state.questions = [];
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
      state.loading = false;
    });
    builder.addCase(fetchQuestionsAsync.rejected, (state, action) => {
      if (action.error) {
        const error = action.error as CustomSerializedError;
      } else {
        state.error = 'An unknown error occurred.';
      }
      state.loading = false;
    });
  }
});

export const { setQuestions, addQuestion, removeQuestion, clearQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;
