import React, { FC } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Header/header.css";
import { useAppDispatch } from "../store/hooks";
import { logOut } from "../feauters/authApi";

export const AdminLayout: FC = React.memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activeClazz = "nav-link active-link";
    const defaultClazz = "nav-link";

    return (
        <>
            <div className="admin_header bg-gray-800 h-16 w-full shadow-md relative">
                <div className="container mx-auto h-full">
                    <nav className="header_wrapper h-full flex justify-center items-center">
                        <ul className="flex gap-10">
                            <li>
                                <NavLink
                                    to="/dashboard/admin"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? activeClazz : defaultClazz
                                    }
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/admin/tests"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? activeClazz : defaultClazz
                                    }
                                >
                                    Tests
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/admin/newtest"
                                    end
                                    className={({ isActive }) =>
                                        isActive ? activeClazz : defaultClazz
                                    }
                                >
                                    Add New Test
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <button
                    onClick={() => {
                        dispatch(logOut());
                        navigate("/");
                    }}
                    className="bg-blue-500 right-5 top-3 absolute hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Log Out
                </button>
            </div>
            <Outlet />
        </>
    );
});
