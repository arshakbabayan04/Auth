import { FC, PropsWithChildren } from "react";
import { CgTrash } from "react-icons/cg";
import { AnswerArr, Result } from "../../types";

const AnswerItem: FC<any> = ({
    answer,
    answersArray,
    onAnswerSelect,
    onDeleteAnswer,
    isAdmin,
    question,
    result,
}) => {
    return (
        <>
            <div
                onClick={() => onAnswerSelect(answer)}
                id="block"
                className={`${
                    result
                        ? result && result.length < 1
                            ? answersArray.some(
                                  (elm: AnswerArr) => elm.answerId == answer.id
                              )
                                ? "bg-green-400"
                                : ""
                            : result.some(
                                  (el: Result) =>
                                      el.answer.status == answer.status
                              )
                            ? "bg-green-500"
                            : "bg-red-600"
                        : null
                } flex items-center gap-2 flex-wrap overflow-hidden w-full hover:bg-fuchsia-400 p-3 duration-500 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group hover:shadow`}
            >
                <div className="ans_wrapper flex items-center justify-between w-full ">
                    <span className=" flex-1 text-black whitespace-nowrap">
                        {answer.answer}
                    </span>

                    {isAdmin && (
                        <span
                            onClick={() => onDeleteAnswer(question, answer)}
                            className="cursor-pointer hover:scale-125 ease-in-out duration-300"
                        >
                            <CgTrash size="24px" color="#D2122E" />
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default AnswerItem;
