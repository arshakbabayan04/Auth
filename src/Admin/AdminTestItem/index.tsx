import React, { FC } from "react";
import { CgTrash } from "react-icons/cg";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoIosArchive } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { archiveTest, deleteTest, getTest } from "../../feauters/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const AdminTestItem: FC<any> = React.memo(({ test, isAdmin }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { tests } = useAppSelector((state) => state.user);

    return (
        <>
            <li
                onClick={() => {
                    console.log(tests);
                    if (!isAdmin) {
                        navigate(`/dashboard/user/tests/${test.id}`);
                    }
                }}
            >
                <div
                    id="block"
                    className="flex items-center gap-2 flex-wrap cursor-pointer overflow-hidden w-full hover:bg-fuchsia-400 p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group hover:shadow"
                >
                    <span className=" flex-1 text-black whitespace-nowrap">
                        {test.name} #{test.id}
                    </span>

                    {isAdmin && (
                        <div className="btn_block flex justify-center gap-2 min-w-10 items-center ">
                            <span
                                className="cursor-pointer hover:scale-125 ease-in-out duration-300 mt-px mr-px"
                                onClick={() => {
                                    dispatch(archiveTest(test.id))
                                        .unwrap()
                                        .then(() => dispatch(getTest()));
                                }}
                            >
                                <IoIosArchive size="24px" color="#D2691E" />
                            </span>
                            <span
                                onClick={() =>
                                    navigate(
                                        `/dashboard/admin/tests/${test.id}`
                                    )
                                }
                                className="cursor-pointer hover:scale-125 ease-in-out duration-300"
                            >
                                <FaRegPenToSquare size="20px" color="#00FA9A" />
                            </span>
                            <span
                                className="cursor-pointer hover:scale-125 ease-in-out duration-300"
                                onClick={() => {
                                    dispatch(deleteTest(test.id))
                                        .unwrap()
                                        .then(() => dispatch(getTest()));
                                }}
                            >
                                <CgTrash size="24px" color="#D2122E" />
                            </span>
                        </div>
                    )}
                </div>
            </li>
        </>
    );
});

export default AdminTestItem;
