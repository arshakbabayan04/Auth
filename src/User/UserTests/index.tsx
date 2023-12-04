import React, { FC, useEffect } from "react";
import AdminTestItem from "../../Admin/AdminTestItem";
import { getTest } from "../../feauters/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const UserTests: FC = React.memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTest());
    }, []);

    const { tests } = useAppSelector((state) => state.user);
    return (
        <>
            <div
                className="all_test pt-10 min-h-screen"
                style={{
                    background:
                        'url("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center/cover no-repeat',
                }}
            >
                <div className="container mx-auto">
                    <h1 className="text-white text-center fs-2 font-bold text-4xl">
                        Tests
                    </h1>

                    <div className="user_wrapper bg-slate-600 p-5 mx-auto mt-10 rounded-xl shadow-md shadow-indigo-700 w-1/2">
                        <ul className="my-4 space-y-3 cursor-pointer">
                            {tests.map((el, i) => (
                                <AdminTestItem
                                    key={i}
                                    test={el}
                                    isAdmin={false}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
});

export default UserTests;
