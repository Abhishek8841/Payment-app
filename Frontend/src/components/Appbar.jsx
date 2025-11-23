import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Appbar = () => {
    const { userDetails } = useContext(AppContext);
    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="flex flex-col justify-center h-full ml-4 text-xl font-bold">
                Payments App
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4 text-lg font-medium">
                    Hello {userDetails?.email || "user"}
                </div>
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl font-bold text-gray-600">
                        {userDetails?.email?.[0] || ""}
                    </div>
                </div>
            </div>
        </div>
    );
};