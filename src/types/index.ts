// src/types/index.ts
export interface Question {
  id: number;
  title: string;
  type: string;
  difficulty: string;
  description?: string; // 题目描述
  example?: string; // 示例
  // 根据需求可以添加更多字段
}
