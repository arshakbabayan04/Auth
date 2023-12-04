import { FC } from "react";
import { CgTrash } from "react-icons/cg";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const AdminTestItem: FC<any> = ({ test, isAdmin }) => {
    const navigate = useNavigate();

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
                    className="flex items-center gap-2 flex-wrap overflow-hidden w-full hover:bg-fuchsia-400 p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
                >
                    <span className=" flex-1 text-black whitespace-nowrap">
                        {test.name} #{test.id}
                    </span>

                    {isAdmin && (
                        <div className="btn_block flex justify-center gap-2 min-w-10 items-center ">
                            <span className="cursor-pointer">
                                <FaRegPenToSquare size="20px" color="#00FA9A" />
                            </span>
                            <span className="cursor-pointer">
                                <CgTrash size="24px" color="#D2122E" />
                            </span>
                        </div>
                    )}
                </div>
            </li>
        </>
    );
};

export default AdminTestItem;
