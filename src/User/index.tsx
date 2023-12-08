import React, { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FaStar } from "react-icons/fa6";

export const User: FC = React.memo(() => {
    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [raitings, setRaiting] = useState<number[]>([]);

    const results = useMemo(
        () =>
            user.tests &&
            user.tests.reduce(
                (s: number, a: any) => s + a.user_test.result,
                0
            ) / user.tests.length,
        [user.tests]
    );

    return (
        <>
            <main className="profile-page pt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <section className="relative py-16 bg-blueGray-200 mt-32">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6 relative">
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {user.name} {user.surname}
                                    </h3>
                                    <span
                                        className="absolute flex gap-px items-center "
                                        style={{ top: "20px", right: "20px" }}
                                    >
                                        <p
                                            className="text-xl"
                                            style={{ marginRight: "4px" }}
                                        >
                                            {results}
                                        </p>
                                        <FaStar size="25px" color="#FF8C00" />
                                    </span>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Los Angeles, California
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        Solution Manager - Creative Tim Officer
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        University of Computer Science
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <table className="w-full mb-5">
                                                <thead>
                                                    <tr className="bg-indigo-600 text-left text-xs font-semibold uppercase tracking-widest text-white ">
                                                        <th className="px-5 py-3">
                                                            ID
                                                        </th>
                                                        <th className="px-5 py-3">
                                                            Name
                                                        </th>
                                                        <th className="px-5 py-3">
                                                            Category
                                                        </th>
                                                        <th className="px-5 py-3">
                                                            Created at
                                                        </th>
                                                        <th className="px-5 py-3">
                                                            Result
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-500">
                                                    {user.tests &&
                                                        user.tests.map(
                                                            (el: any) => {
                                                                console.log(el);
                                                                return (
                                                                    <tr
                                                                        key={
                                                                            el.id
                                                                        }
                                                                    >
                                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                            <p className="whitespace-no-wrap">
                                                                                {
                                                                                    el.id
                                                                                }
                                                                            </p>
                                                                        </td>
                                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                            <div className="flex items-center">
                                                                                <div className="ml-3">
                                                                                    <p className="whitespace-no-wrap">
                                                                                        {
                                                                                            el.name
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                            <p className="whitespace-no-wrap">
                                                                                {
                                                                                    el.categoryId
                                                                                }
                                                                            </p>
                                                                        </td>
                                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                            <p className="whitespace-no-wrap">
                                                                                {el.user_test.createdAt.slice(
                                                                                    0,
                                                                                    10
                                                                                )}
                                                                            </p>
                                                                        </td>

                                                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                                            <span
                                                                                className={`rounded-full ${
                                                                                    el
                                                                                        .user_test
                                                                                        .result ===
                                                                                    0
                                                                                        ? "bg-red-200"
                                                                                        : "bg-green-200"
                                                                                } px-3 py-1 text-xs font-semibold text-green-900`}
                                                                            >
                                                                                {
                                                                                    el
                                                                                        .user_test
                                                                                        .result
                                                                                }
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                </tbody>
                                            </table>
                                            <a
                                                href="#pablo"
                                                className="font-normal text-blue-500"
                                            >
                                                Show more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                    <div className="text-sm text-white font-semibold py-1">
                                        Made with{" "}
                                        <a
                                            href="https://www.creative-tim.com/product/notus-js"
                                            className="text-blueGray-500 hover:text-gray-800"
                                            target="_blank"
                                        >
                                            Notus JS
                                        </a>{" "}
                                        by{" "}
                                        <a
                                            href="https://www.creative-tim.com"
                                            className="text-blueGray-500 hover:text-blueGray-800"
                                            target="_blank"
                                        >
                                            {" "}
                                            Creative Tim
                                        </a>
                                        .
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    );
});
