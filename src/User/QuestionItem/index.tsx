import { FC } from "react";
import { CgTrash } from "react-icons/cg";
import { Answer, AnswerArr } from "../../types";

const QuestionItem: FC<any> = ({
    el,
    isAdmin,
    onDeleteQuestion,
    onDeleteAnswer,
    onAnswerSelect,
    answersArray,
}) => {
    return (
        <>
            <div className="user_wrapper bg-slate-600 p-5 mx-auto mt-10 rounded-xl shadow-md shadow-indigo-700 w-1/2">
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
                            <div
                                onClick={() => onAnswerSelect(item)}
                                key={i}
                                id="block"
                                className={`${
                                    answersArray.some(
                                        (elm: AnswerArr) =>
                                            elm.answerId == item.id
                                    )
                                        ? "bg-green-400"
                                        : ""
                                } flex items-center gap-2 flex-wrap overflow-hidden w-full hover:bg-fuchsia-400 p-3 duration-500 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group hover:shadow`}
                            >
                                <div className="ans_wrapper flex items-center justify-between w-full ">
                                    <span className=" flex-1 text-black whitespace-nowrap">
                                        {item.answer}
                                    </span>

                                    {isAdmin && (
                                        <span
                                            onClick={() =>
                                                onDeleteAnswer(el, item)
                                            }
                                            className="cursor-pointer hover:scale-125 ease-in-out duration-300"
                                        >
                                            <CgTrash
                                                size="24px"
                                                color="#D2122E"
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default QuestionItem;
