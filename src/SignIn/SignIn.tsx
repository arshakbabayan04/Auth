import React, { FC, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store/hooks";
import { getUser, signIn } from "../feauters/authApi";
import { Link, useNavigate } from "react-router-dom";

const SignIn: FC = React.memo(() => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const signin = useCallback((values: any) => {
        dispatch(signIn(values))
            .unwrap()
            .then((res) => {
                localStorage.setItem("token", res.token);
                if (res.type == 0) {
                    navigate("/dashboard/user");
                } else {
                    navigate("/dashboard/admin");
                }
            });
    }, []);

    return (
        <>
            <div
                className="sign_in min-h-screen bg-gray-900 pt-20"
                style={{
                    background:
                        'url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center/cover no-repeat',
                }}
            >
                <div className="container mx-auto">
                    <div className="sign_in_wrapper w-full flex justify-center items-center gap-36">
                        <div className="title w-1/3">
                            <h2 className="text-6xl text-white mb-5">
                                Welcome to our <br /> team
                            </h2>
                            <p className="text-white">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Saepe repellat pariatur
                                perferendis! Iure dolorem molestiae quod
                                eligendi laborum? Neque ad repellat itaque
                                dolore debitis quo nesciunt illo beatae
                                perferendis cupiditate. Rem nisi natus quam
                                error quasi magnam eos suscipit odit quibusdam
                                magni repudiandae, exercitationem facere
                                expedita libero molestiae quisquam! Aliquam
                                itaque quae dolorum culpa suscipit, similique
                                quis eos quibusdam blanditiis!
                            </p>
                        </div>
                        <div className="w-full max-w-md">
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email().required(),
                                    password: Yup.string().required(),
                                })}
                                onSubmit={(values) => {
                                    signin(values);
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
                                            Login
                                        </h2>
                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="email1"
                                            >
                                                Email
                                            </label>
                                            <input
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="email1"
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
                                                htmlFor="password1"
                                            >
                                                Password
                                            </label>
                                            <input
                                                name="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                id="password1"
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
                                            <Link
                                                to="/signup"
                                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default SignIn;
