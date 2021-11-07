import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AnswerArea from "../components/AnswerArea";
import ScoringArea from "../components/ScoringArea";
import { AnswerType, userAnswersType, userScoreType } from "../domain/Answer";

const Home: NextPage = () => {
  const today = new Date();

  const [userAnswers, setUserAnswers] = useState<userAnswersType>({});
  const [userScore, setUserScore] = useState<userScoreType>({});
  const [scoringMode, setScoringMode] = useState<boolean>(false);

  const handleCheckAnswer = (
    questionNumber: number,
    answerIndex: AnswerType
  ) => {
    if (scoringMode) return false;
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[questionNumber] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const clearAnswer = () => {
    if (scoringMode) return false;
    if (!confirm("Are you sure? ")) return false;
    setUserAnswers({});
    setUserScore({});
  };

  const handleScoring = (questionNumber: number, result: boolean) => {
    if (!scoringMode) return false;
    const newUserScore = { ...userScore };
    newUserScore[questionNumber] = result;
    setUserScore(newUserScore);
  };

  const countCorrectAnswer = (range: number[]) => {
    let count = 0;
    for (const qNo of range) {
      if (userScore[qNo]) count += 1;
    }
    return count;
  };

  const range = (begin: number, end: number) =>
    [...Array(end + 1 - begin)].map((_, i) => begin + i);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>マークシート</title>
        <meta name="description" content="mark sheet app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="section">
          <div className="flex flex-col p-6">
            <div className="mb-4">{today.toLocaleDateString()}</div>

            {scoringMode ? (
              <div className="flex flex-row justify-between items-end">
                <div className="flex flex-row">
                  <div>
                    <div className="border relative">Part1</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(1, 6))}/6
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Part2</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(7, 31))}/25
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Part3</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(32, 70))}/39
                    </div>
                  </div>
                  <div>
                    <div className="border relative">Part4</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(71, 100))}/30
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Listening計</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(1, 100))}/100
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Part5</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(101, 130))}/30
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Part6</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(131, 146))}/16
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Part7</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(147, 200))}/54
                    </div>
                  </div>

                  <div>
                    <div className="border relative">Reading計</div>
                    <div className="border relative">
                      {countCorrectAnswer(range(101, 200))}/100
                    </div>
                  </div>
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 h-10"
                  onClick={() => {
                    setScoringMode(false);
                  }}>
                  解答画面にもどる
                </button>
              </div>
            ) : (
              <div className="flex flex-row justify-start items-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
                  onClick={() => {
                    setScoringMode(true);
                  }}>
                  自己採点する
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-32 ml-2"
                  onClick={clearAnswer}>
                  クリア
                </button>
              </div>
            )}

            <div className="flex flex-row mt-4">
              <div className="">
                <div className="border">Part1</div>
                <div>
                  {range(1, 10).map((questionNumber) => {
                    return (
                      <div className="border relative" key={questionNumber}>
                        <AnswerArea
                          questionNumber={questionNumber}
                          disabled={scoringMode}
                          handleCheck={(answerIndex) => {
                            handleCheckAnswer(questionNumber, answerIndex);
                          }}
                          userAnswer={userAnswers[questionNumber]}
                          score={userScore[questionNumber]}
                        />
                        <ScoringArea
                          disabled={!scoringMode}
                          handleScoring={(result) => {
                            handleScoring(questionNumber, result);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="">
                <div className="border relative">Part2</div>
                <div className="flex flex-row">
                  <div>
                    {range(11, 20).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex: AnswerType) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    {range(21, 30).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(31, 40).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="border relative">Part3</div>
                <div className="flex flex-row">
                  <div>
                    {range(41, 50).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    {range(51, 60).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(61, 70).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="border relative">Part4</div>
                <div className="flex flex-row">
                  <div>
                    {range(71, 80).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    {range(81, 90).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(91, 100).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 下段 */}

            <div className="flex flex-row mt-4">
              <div className="">
                <div className="border relative">Part5</div>
                <div className="flex flex-row">
                  <div>
                    {range(101, 110).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(111, 120).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    {range(121, 130).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="border relative">Part6</div>
                <div className="flex flex-row">
                  <div>
                    {range(131, 140).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(141, 150).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="border relative">Part7</div>
                <div className="flex flex-row">
                  <div>
                    {range(151, 160).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(161, 170).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(171, 180).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    {range(181, 190).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    {range(191, 200).map((questionNumber) => {
                      return (
                        <div className="border relative" key={questionNumber}>
                          <AnswerArea
                            questionNumber={questionNumber}
                            disabled={scoringMode}
                            handleCheck={(answerIndex) => {
                              handleCheckAnswer(questionNumber, answerIndex);
                            }}
                            userAnswer={userAnswers[questionNumber]}
                            score={userScore[questionNumber]}
                          />
                          <ScoringArea
                            disabled={!scoringMode}
                            handleScoring={(result) => {
                              handleScoring(questionNumber, result);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
