export type AnswerType = 0 | 1 | 2 | 3;

export type userAnswersType = {
  [keyof: number]: AnswerType;
};

export type userScoreType = {
  [keyof: number]: boolean;
};
