import React, { FC, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store/hooks";
import { signUp } from "../feauters/authApi";
import { useNavigate } from "react-router-dom";

const SignUp: FC = React.memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signup = useCallback(async (values: any) => {
        await dispatch(signUp(values))
            .unwrap()
            .then((res) => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div className="sign_up min-h-screen bg-gray-900 pt-20">
                <div className="container mx-auto">
                    <div className="w-full max-w-lg mx-auto">
                        <Formik
                            initialValues={{
                                name: "",
                                surname: "",
                                email: "",
                                password: "",
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required(),
                                surname: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().required(),
                            })}
                            onSubmit={(values) => {
                                signup(values);
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                errors,
                                touched,
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                >
                                    <h2 className="text-center text-xl font-bold mb-5">
                                        Sign up
                                    </h2>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            placeholder="Username"
                                        />
                                        {touched.name && errors.name && (
                                            <div className="text-red-500">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="surname"
                                        >
                                            Surname
                                        </label>
                                        <input
                                            name="surname"
                                            value={values.surname}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="surname"
                                            type="text"
                                            placeholder="Surname"
                                        />
                                        {touched.surname && errors.surname && (
                                            <div className="text-red-500">
                                                {errors.surname}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                        />
                                        {touched.email && errors.email && (
                                            <div className="text-red-500">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        {touched.password &&
                                            errors.password && (
                                                <div className="text-red-500">
                                                    {errors.password}
                                                </div>
                                            )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Sign In
                                        </button>
                                        <a
                                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                            href="#"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
});

export default SignUp;
