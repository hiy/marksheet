import React, { useEffect, useState, Fragment } from "react";

type Props = {
  disabled: boolean;
  handleScoring: (result: boolean) => void;
};

const ScoringArea: React.FC<Props> = ({ disabled, handleScoring }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full ${
        disabled ? "hidden" : ""
      }`}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}>
      <div
        className={
          isShow ? "flex flex-row justify-center w-32 pt-1" : "hidden"
        }>
        <button
          className="bg-green-400 hover:bg-green-600 text-white font-bold rounded w-10"
          onClick={() => {
            handleScoring(true);
          }}>
          O
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded w-10 ml-2"
          onClick={() => {
            handleScoring(false);
          }}>
          X
        </button>
      </div>
    </div>
  );
};

export default ScoringArea;
