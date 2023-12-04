import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../feauters/authApi";
import { useAppDispatch } from "../store/hooks";

const PrivateRoute = () => {
    const [response, setResponse] = useState<Boolean>(false);
    const [type, setType] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        } else {
            dispatch(getUser())
                .unwrap()
                .then((res) => {
                    setResponse(true);
                    setType(res.user.type);
                })
                .catch((err) => {
                    setResponse(false);
                    navigate("/");
                });
        }
    }, []);

    return (
        <>
            {response && type == 1 ? (
                <Navigate to={location.pathname} />
            ) : response && type == 0 ? (
                <Navigate to={location.pathname} />
            ) : (
                ""
            )}
            <Outlet />
        </>
    );
};

export default PrivateRoute;
