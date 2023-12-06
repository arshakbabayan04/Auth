import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import {
    addTestResult,
    deleteAnswer,
    deleteQuestion,
    getSingleTest,
} from "../../feauters/authApi";
import { CgTrash } from "react-icons/cg";
import { Answer, Question } from "../../types";
import Swal from "sweetalert2";

const StartTest: FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [answersArray, setAnswersArray] = useState<AnswerArr[]>([]);

    interface AnswerArr {
        questionId: number | string;
        answerId: number | string;
    }

    useEffect(() => {
        id && dispatch(getSingleTest(id));
    }, []);

    const { singleTest } = useAppSelector((state) => state.user);

    const onDeleteQuestion = useCallback((el: Question) => {
        if (singleTest.questions.length > 1) {
            dispatch(deleteQuestion(el.id))
                .unwrap()
                .then(() => {
                    id && dispatch(getSingleTest(id));
                });
        }
    }, []);

    const onDeleteAnswer = useCallback((el: Question, item: Answer) => {
        if (el.answers.length > 2) {
            dispatch(deleteAnswer(item.id))
                .unwrap()
                .then(() => {
                    id && dispatch(getSingleTest(id));
                });
        }
    }, []);

    const setAnswer = useCallback(
        (questionId: number | string, answerId: number | string) => {
            const newObj = {
                questionId,
                answerId,
            };

            setAnswersArray((answersArray) => {
                const newArray = answersArray.filter((itm: AnswerArr) => {
                    return itm.questionId !== questionId;
                });
                return [...newArray, newObj];
            });
        },
        []
    );

    const onAnswerSelect = useCallback((item: any) => {
        setAnswer(item.questionId, item.id);
    }, []);

    const onFinishTest = () => {
        Swal.fire({
            title: "Do you want to finish test?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Finish",
            denyButtonText: `Don't Finish`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const newObj = {
                    testId: singleTest.id,
                    questions: answersArray,
                };

                dispatch(addTestResult(newObj))
                    .unwrap()
                    .then(() => {
                        Swal.fire("Saved!", "", "success");
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <>
            <div
                className="start_test pt-10 min-h-screen"
                style={{
                    background:
                        'url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center/cover no-repeat',
                }}
            >
                <div className="container mx-auto">
                    <h1 className="text-white text-center fs-2 font-bold text-4xl">
                        {singleTest.name}
                    </h1>

                    {singleTest.questions &&
                        singleTest.questions.map((el, i) => (
                            <div
                                key={i}
                                className="user_wrapper bg-slate-600 p-5 mx-auto mt-10 rounded-xl shadow-md shadow-indigo-700 w-1/2"
                            >
                                <div className="headeling_wrapper flex items-center">
                                    <h1 className="text-white text-left fs-2 font-bold text-4xl">
                                        {el.question}
                                    </h1>

                                    {isAdmin && (
                                        <span
                                            onClick={() => onDeleteQuestion(el)}
                                            className="mt-3 ml-2 cursor-pointer hover:scale-150 ease-in-out duration-300"
                                        >
                                            <CgTrash
                                                size="24px"
                                                color="#D2122E"
                                            />
                                        </span>
                                    )}
                                </div>

                                <div className="answers_wrapper my-4 space-y-3 cursor-pointer">
                                    {el.answers &&
                                        el.answers.map((item, i) => (
                                            <div
                                                onClick={() =>
                                                    onAnswerSelect(item)
                                                }
                                                key={i}
                                                id="block"
                                                className={`${
                                                    answersArray.some(
                                                        (elm) =>
                                                            elm.answerId ==
                                                            item.id
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
                                                                onDeleteAnswer(
                                                                    el,
                                                                    item
                                                                )
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
                        ))}

                    {!isAdmin ? (
                        <button
                            onClick={() => onFinishTest()}
                            className="block bg-green-500 mx-auto mt-10 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-blue-500 rounded"
                        >
                            Finish Test
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default StartTest;
