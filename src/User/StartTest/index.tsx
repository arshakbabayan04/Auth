import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleTest } from "../../feauters/authApi";

const StartTest = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [activeClass, setActiveClass] = useState<any>("");
    const [activeQuestion, setActiveQuestion] = useState<any>([]);

    useEffect(() => {
        dispatch(getSingleTest(id));
    }, []);

    const { singleTest } = useAppSelector((state) => state.user);

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
                                <h1 className="text-white text-left fs-2 font-bold text-4xl">
                                    {el.question}
                                </h1>

                                <div className="answers_wrapper my-4 space-y-3 cursor-pointer">
                                    {el.answers &&
                                        el.answers.map((item, i) => (
                                            <div
                                                onClick={(e) => {
                                                    setActiveQuestion([
                                                        ...activeQuestion,
                                                        el.id,
                                                    ]);
                                                    if (item.status === 1) {
                                                        setActiveClass(
                                                            "bg-green-400"
                                                        );
                                                    } else {
                                                        setActiveClass(
                                                            "bg-red-500"
                                                        );
                                                    }
                                                }}
                                                key={i}
                                                id="block"
                                                className={`${
                                                    activeClass.includes(
                                                        item.questionId
                                                    ) && activeClass
                                                } flex items-center gap-2 flex-wrap overflow-hidden w-full hover:bg-fuchsia-400 p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow`}
                                            >
                                                <span className=" flex-1 text-black whitespace-nowrap">
                                                    {item.answer}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default StartTest;
