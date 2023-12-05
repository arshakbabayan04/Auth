import React, { FC, useCallback, useEffect, useState } from "react";
import { Formik, FieldArray, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { TestForm } from "../../types";
import { addTest, getCategory } from "../../feauters/authApi";

const AddTest: FC = React.memo(() => {
    const initialValues: TestForm = {
        name: "",
        category: "",
        questions: [],
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    const { categories } = useAppSelector((state) => state.user);

    const submitFunc = useCallback((values: TestForm, { resetForm }: any) => {
        console.log(values);

        dispatch(addTest(values))
            .unwrap()
            .then(() =>
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your poll has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                })
            );

        resetForm();
    }, []);

    return (
        <>
            <div
                className="add_poll pt-20 min-h-screen"
                style={{
                    background:
                        'url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center/cover no-repeat',
                }}
            >
                <div className="container mx-auto">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            name: Yup.string().required(),
                            category: Yup.string().required(),
                            questions: Yup.array().of(
                                Yup.object().shape({
                                    question: Yup.string().required(),
                                    answers: Yup.array().of(
                                        Yup.object().shape({
                                            answer: Yup.string().required(),
                                        })
                                    ),
                                })
                            ),
                        })}
                        onSubmit={submitFunc}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            setFieldError,
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                                className="max-w-md mx-auto mt-10 bg-white p-5 rounded-xl min-h-96"
                            >
                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="name"
                                        >
                                            Test Name
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="name"
                                            value={values.name}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="name"
                                            placeholder="Name"
                                        />
                                        {errors.name && touched.name && (
                                            <p className="text-red-700">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Category
                                    </label>
                                    <div className="mt-2 mb-4">
                                        <select
                                            id="category"
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value=""></option>
                                            {categories.map((item) => {
                                                return (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {errors.category &&
                                            touched.category && (
                                                <p className="text-red-700">
                                                    {errors.category}
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <FieldArray name="questions">
                                    {(arrayHelpers) => {
                                        return (
                                            <>
                                                {values.questions.map(
                                                    (question, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-full"
                                                        >
                                                            <label
                                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                htmlFor={`questions[${i}].question`}
                                                            >
                                                                Question
                                                            </label>
                                                            <input
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                name={`questions[${i}].question`}
                                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                placeholder="Question"
                                                            />
                                                            {errors.questions &&
                                                                touched.questions && (
                                                                    <p className="text-red-700">
                                                                        Required
                                                                    </p>
                                                                )}
                                                            <FieldArray
                                                                name={`questions[${i}].answers`}
                                                            >
                                                                {(
                                                                    answerArrayHelpers
                                                                ) => (
                                                                    <div className="flex items-center flex-wrap -mx-3 mb-2">
                                                                        {question.answers.map(
                                                                            (
                                                                                answer,
                                                                                j
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        j
                                                                                    }
                                                                                    className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                                                                                >
                                                                                    <label
                                                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                                        htmlFor={`questions[${i}].answers[${j}].answer`}
                                                                                    >
                                                                                        {`Answer ${
                                                                                            j +
                                                                                            1
                                                                                        }`}
                                                                                    </label>
                                                                                    <input
                                                                                        onChange={
                                                                                            handleChange
                                                                                        }
                                                                                        name={`questions[${i}].answers[${j}].answer`}
                                                                                        className={`${
                                                                                            answer.status
                                                                                                ? "bg-green-400 focus:bg-green-400"
                                                                                                : ""
                                                                                        } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
                                                                                        type="text"
                                                                                        placeholder={`${
                                                                                            j +
                                                                                            1
                                                                                        }`}
                                                                                        onDoubleClick={() => {
                                                                                            const newAnswers =
                                                                                                question.answers.map(
                                                                                                    (
                                                                                                        a,
                                                                                                        index
                                                                                                    ) => ({
                                                                                                        ...a,
                                                                                                        status:
                                                                                                            index ===
                                                                                                            j
                                                                                                                ? 1
                                                                                                                : 0,
                                                                                                    })
                                                                                                );
                                                                                            setFieldValue(
                                                                                                `questions[${i}].answers`,
                                                                                                newAnswers
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                    {errors.questions &&
                                                                                        touched.questions && (
                                                                                            <p className="text-red-700">
                                                                                                Required
                                                                                            </p>
                                                                                        )}
                                                                                </div>
                                                                            )
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                if (
                                                                                    question
                                                                                        .answers
                                                                                        .length <
                                                                                    5
                                                                                ) {
                                                                                    answerArrayHelpers.push(
                                                                                        {
                                                                                            answer: "",
                                                                                            status: 0,
                                                                                        }
                                                                                    );
                                                                                } else {
                                                                                    setFieldError(
                                                                                        `questions[${i}].answers`,
                                                                                        "Count > 5"
                                                                                    );
                                                                                }
                                                                            }}
                                                                            className="h-1/2 ml-3 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md focus:outline-none focus:shadow-outline"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                    )
                                                )}
                                                <div className="btns_wrapper flex gap-5 mb-5">
                                                    <button
                                                        onClick={() => {
                                                            arrayHelpers.push({
                                                                question: "",
                                                                answers: [
                                                                    {
                                                                        answer: "",
                                                                        status: 0,
                                                                    },
                                                                    {
                                                                        answer: "",
                                                                        status: 0,
                                                                    },
                                                                ],
                                                            });
                                                        }}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        type="button"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </>
                                        );
                                    }}
                                </FieldArray>

                                <div className="btns_wrapper flex gap-5 ml-72">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Add Test
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
});

export default AddTest;
