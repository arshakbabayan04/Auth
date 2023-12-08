import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleTest } from "../../feauters/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User } from "../../types";

const AdminTestUsers: FC = React.memo(() => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        id && dispatch(getSingleTest(id));
    }, []);

    const { singleTest } = useAppSelector((state) => state.user);

    console.log(singleTest);

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

                    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                        <div className="overflow-y-hidden rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                            <th className="px-5 py-3">ID</th>
                                            <th className="px-5 py-3">
                                                Full Name
                                            </th>
                                            <th className="px-5 py-3">Email</th>
                                            <th className="px-5 py-3">
                                                Created at
                                            </th>
                                            <th className="px-5 py-3">
                                                Result
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-500">
                                        {singleTest.users &&
                                            singleTest.users.map(
                                                (el: User, i) => (
                                                    <tr key={el.id}>
                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                            <p className="whitespace-no-wrap">
                                                                {el.id}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                            <div className="flex items-center">
                                                                <div className="ml-3">
                                                                    <p className="whitespace-no-wrap">
                                                                        {
                                                                            el.name
                                                                        }{" "}
                                                                        {
                                                                            el.surname
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                            <p className="whitespace-no-wrap">
                                                                {el.email}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                            <p className="whitespace-no-wrap">
                                                                {singleTest.user_test[
                                                                    i
                                                                ].createdAt.slice(
                                                                    0,
                                                                    10
                                                                )}
                                                            </p>
                                                        </td>

                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                            <span
                                                                className={`rounded-full ${
                                                                    singleTest
                                                                        .user_test[
                                                                        i
                                                                    ].result < 5
                                                                        ? "bg-red-200"
                                                                        : "bg-green-200"
                                                                } px-3 py-1 text-xs font-semibold text-green-900`}
                                                            >
                                                                {
                                                                    singleTest
                                                                        .user_test[
                                                                        i
                                                                    ].result
                                                                }
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default AdminTestUsers;
