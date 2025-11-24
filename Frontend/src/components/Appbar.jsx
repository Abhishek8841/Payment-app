import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
export const Appbar = ({ setLoggedin }) => {
    const { userDetails } = useContext(AppContext);
    const navigate = useNavigate();
    async function logoutHandler() {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:4000/api/v1/logout",
                {},
                {
                    headers: { Authorization: "Bearer " + token },
                    withCredentials: true
                }
            );

            localStorage.removeItem("token"); // remove token
            toast.success("Logged out");
            setLoggedin(false);
            navigate("/signin");
        } catch (error) {
            console.log(error);
            toast.error("Error logging out");
        }
    }
    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="flex flex-col justify-center h-full ml-4 text-xl font-bold">
                Payments App
            </div>
            <button onClick={logoutHandler} className="font-bold text-xl">Logout</button>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4 text-lg font-medium">
                    Hello {userDetails?.email?.split("@")[0].toUpperCase() || "user"}
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