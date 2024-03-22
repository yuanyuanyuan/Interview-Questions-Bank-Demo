// 定义枚举对象
export const QuestionType = {
  CHOICE: '1',
  JUDGEMENT: '2'
};

// 在渲染题目类型时，可以根据枚举的值来显示不同的文本
export const renderQuestionType = (type: any) => {
  console.log('type', type);
  switch (type) {
    case QuestionType.CHOICE:
      return '选择题';
    case QuestionType.JUDGEMENT:
      return '判断题';
    default:
      return '未知类型';
  }
};
