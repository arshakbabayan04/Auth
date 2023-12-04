import { useRoutes } from "react-router-dom";
import { Admin } from "../Admin";
import AddTest from "../Admin/AddTest";
import { AdminLayout } from "../Admin/AdminLayout";
import AdminTest from "../Admin/AdminTest";
import Header from "../Header/Header";
import PrivateRoute from "../PrivateRoute";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import { User } from "../User";
import StartTest from "../User/StartTest";
import { UserLayout } from "../User/UserLayout";
import UserTests from "../User/UserTests";

export const Router = () => {
    return useRoutes([
        {
            path: "",
            element: <Header />,
            children: [
                {
                    path: "/",
                    element: <SignIn />,
                },
                {
                    path: "/signup",
                    element: <SignUp />,
                },
            ],
        },
        {
            path: "/dashboard",
            element: <PrivateRoute />,
            children: [
                {
                    path: "admin",
                    element: <AdminLayout />,
                    children: [
                        {
                            path: "",
                            element: <Admin />,
                        },
                        {
                            path: "tests",
                            element: <AdminTest />,
                        },
                        {
                            path: "newtest",
                            element: <AddTest />,
                        },
                    ],
                },
                {
                    path: "user",
                    element: <UserLayout />,
                    children: [
                        {
                            path: "",
                            element: <User />,
                        },
                        {
                            path: "tests",
                            element: <UserTests />,
                        },
                        {
                            path: "tests/:id",
                            element: <StartTest />,
                        },
                    ],
                },
                
            ],
        },
    ]);
};
