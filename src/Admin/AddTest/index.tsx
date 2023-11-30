import React, { FC, useState } from "react";
import { Formik, FieldArray, Form } from "formik";
import { useAppDispatch } from "../../store/hooks";
import * as Yup from "yup";
import Swal from "sweetalert2";

const AddTest: FC = React.memo(() => {
    const [showInput, setShowInput] = useState<boolean>(false);

    const initialValues = {
        answers: [
            {
                answer: "",
            },
            {
                answer: "",
            },
        ],
        name: "",
        questions: [],
    };

    const dispatch = useAppDispatch();

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
                        })}
                        onSubmit={(values, { resetForm }) => {
                            const data: any = {
                                name: values.name,
                                questions: [],
                                question: values.questions,
                            };

                            values.answers.forEach((el) => {
                                data.answers.push(el.answer);
                            });

                            console.log("data", data);
                            
                            // dispatch(addTest(data))
                            //     .unwrap()
                            //     .then(() =>
                            //         Swal.fire({
                            //             position: "center",
                            //             icon: "success",
                            //             title: "Your poll has been saved",
                            //             showConfirmButton: false,
                            //             timer: 1500,
                            //         })
                            //     );

                            resetForm();
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched,
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                                className="max-w-md mx-auto mt-10 bg-white p-5 rounded-xl min-h-96"
                            >
                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="question"
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
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>
                                </div>

                                <FieldArray name="questions">
                                    {({ push }) => (
                                        <>
                                            {showInput &&
                                                values.questions.map(
                                                    (item, i) => (
                                                        <>
                                                            <div className="w-full">
                                                                <label
                                                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                    htmlFor="question"
                                                                >
                                                                    Question
                                                                </label>
                                                                <input
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    name="question"
                                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                                    id="question"
                                                                    placeholder="Question"
                                                                />
                                                            </div>
                                                            <FieldArray name="answers">
                                                                {({ push }) => (
                                                                    <div className="flex items-center flex-wrap -mx-3 mb-2">
                                                                        {values.answers.map(
                                                                            (
                                                                                item,
                                                                                i
                                                                            ) => {
                                                                                if (
                                                                                    i >
                                                                                    4
                                                                                ) {
                                                                                    return;
                                                                                }
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        className=" w-full md:w-1/2 px-3 mb-6 md:mb-0"
                                                                                    >
                                                                                        <label
                                                                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                                            htmlFor="questions"
                                                                                        >
                                                                                            Question{" "}
                                                                                            {i +
                                                                                                1}
                                                                                        </label>
                                                                                        <input
                                                                                            onChange={
                                                                                                handleChange
                                                                                            }
                                                                                            name={`questions.${i}.name`}
                                                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                                            id="questions"
                                                                                            type="text"
                                                                                            placeholder="1"
                                                                                        />
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                push(
                                                                                    {
                                                                                        name: "",
                                                                                    }
                                                                                )
                                                                            }
                                                                            className="h-1/2 ml-3 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md focus:outline-none focus:shadow-outline"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </FieldArray>
                                                        </>
                                                    )
                                                )}
                                            <div className="btns_wrapper flex gap-5 mb-5">
                                                <button
                                                    onClick={() => {
                                                        setShowInput(true);
                                                        push({
                                                            question: "",
                                                        });
                                                    }}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="button"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </>
                                    )}
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
