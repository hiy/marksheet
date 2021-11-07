export type ABCDIndex = 0 | 1 | 2 | 3;
export type CorrectOrIncorrect = boolean;

// export type userAnswersType = {
//   [keyof: number]: ABCDIndex;
// };

// export type userScoreType = {
//   [keyof: number]: CorrectOrIncorrect;
// };

export type userAnswerData = {
  [keyof: number]: {
    selectedAnswer: ABCDIndex;
    isCorrect: CorrectOrIncorrect;
  };
};
