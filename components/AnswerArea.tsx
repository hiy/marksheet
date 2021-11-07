import React, { useEffect, useState, Fragment } from "react";
import { AnswerType } from "../domain/Answer";

type Props = {
  questionNumber: number;
  userAnswer?: number | null;
  handleCheck: (answerIndex: AnswerType) => void;
  disabled: boolean;
  score: boolean | undefined;
};

const AnswerArea: React.FC<Props> = ({
  questionNumber,
  userAnswer,
  handleCheck,
  disabled,
  score,
}: Props) => {
  const backGroundColor = () => {
    if (score === undefined || !disabled) return "";
    if (score) return "bg-green-400 text-white";
    return "bg-red-400 text-white";
  };

  return (
    <div className={`flex flex-row ${backGroundColor()}`}>
      <div className="w-7 py-1">{questionNumber}</div>
      <div>
        <input
          type="radio"
          name={`mark_${questionNumber}`}
          id={`mark_${questionNumber}_a`}
          checked={userAnswer == 0}
          disabled={disabled}
          onChange={() => handleCheck(0)}
        />
        <label className="mark_label" htmlFor={`mark_${questionNumber}_a`}>
          <span>A</span>
        </label>
        <input
          type="radio"
          name={`mark_${questionNumber}`}
          id={`mark_${questionNumber}_b`}
          checked={userAnswer == 1}
          disabled={disabled}
          onChange={() => handleCheck(1)}
        />
        <label className="mark_label" htmlFor={`mark_${questionNumber}_b`}>
          <span>B</span>
        </label>
        <input
          type="radio"
          name={`mark_${questionNumber}`}
          id={`mark_${questionNumber}_c`}
          checked={userAnswer == 2}
          disabled={disabled}
          onChange={() => handleCheck(2)}
        />
        <label className="mark_label" htmlFor={`mark_${questionNumber}_c`}>
          <span>C</span>
        </label>
        <input
          type="radio"
          name={`mark_${questionNumber}`}
          id={`mark_${questionNumber}_d`}
          checked={userAnswer == 3}
          disabled={disabled}
          onChange={() => handleCheck(3)}
        />
        <label className="mark_label" htmlFor={`mark_${questionNumber}_d`}>
          <span>D</span>
        </label>
      </div>
    </div>
  );
};

export default AnswerArea;
