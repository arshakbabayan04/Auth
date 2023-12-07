import { FC } from "react";
import { CgTrash } from "react-icons/cg";
import { Answer, AnswerArr } from "../../types";
import AnswerItem from "../AnswerItem";

const QuestionItem: FC<any> = ({
  el,
  isAdmin,
  onDeleteQuestion,
  onDeleteAnswer,
  onAnswerSelect,
  answersArray,
  result,
}) => {
  return (
    <>
      <div className="user_wrapper bg-slate-600 p-5 mx-auto mt-10 rounded-xl shadow-md shadow-indigo-700 w-1/2 overflow-hidden">
        <div className="headeling_wrapper flex items-center">
          <h1 className="text-white text-left fs-2 font-bold text-4xl">
            {el.question}
          </h1>

          {isAdmin && (
            <span
              onClick={() => onDeleteQuestion(el)}
              className="mt-3 ml-2 cursor-pointer hover:scale-150 ease-in-out duration-300"
            >
              <CgTrash size="24px" color="#D2122E" />
            </span>
          )}
        </div>

        <div className="answers_wrapper my-4 space-y-3 cursor-pointer">
          {el.answers &&
            el.answers.map((item: Answer, i: number) => (
              <AnswerItem
                key={i}
                answer={item}
                answersArray={answersArray}
                onAnswerSelect={onAnswerSelect}
                onDeleteAnswer={onDeleteAnswer}
                isAdmin={isAdmin}
                question={el}
                result={result}
                index={i}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default QuestionItem;
