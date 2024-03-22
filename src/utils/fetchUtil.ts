// fetchUtil.ts

import mockQuestionsOk from '../mock/questions_ok.json';
import mockQuestionsErr from '../mock/questions_error.json';
import { rejects } from 'node:assert';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string | URLSearchParams;
}

export const fetchWrapper = async <T>(
  url: string,
  options?: FetchOptions
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: options?.headers,
      body:
        options?.body && typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options?.body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const data = mockQuestionsOk;
    const data = mockQuestionsErr;
    if (data.errCode) {
      const message = `${JSON.stringify(data)}`;
      throw new Error(message);
    }
    // const data = await response.json();
    return data as T;
  } catch (error) {
    console.log('fetch catch:', error);
    throw error; // 抛出错误，可以被async thunk的rejected处理
  }
};
