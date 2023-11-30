import React, { FC, useEffect } from "react";
import { getTest } from "../../feauters/authApi";
import { useAppDispatch } from "../../store/hooks";

const AdminTest: FC = React.memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTest());
    }, []);

    return <></>;
});

export default AdminTest;
