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
import { Answer, AnswerArr, Question } from "../../types";
import Swal from "sweetalert2";
import QuestionItem from "../QuestionItem";

const StartTest: FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [answersArray, setAnswersArray] = useState<AnswerArr[]>([]);

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
                        singleTest.questions.map((question, i) => (
                            <QuestionItem
                                key={i}
                                el={question}
                                isAdmin={isAdmin}
                                onDeleteAnswer={onDeleteAnswer}
                                onDeleteQuestion={onDeleteQuestion}
                                onAnswerSelect={onAnswerSelect}
                                answersArray={answersArray}
                            />
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
