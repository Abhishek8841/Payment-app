import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Send = () => {
//
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const { balance, setBalance } = useContext(AppContext);
    if (!user) {
        return (
            <div className="text-center mt-20 text-xl">
                No user selected — go back and choose someone to send money to.
            </div>
        );
    }
//
    const [formData, setFormData] = useState({
        to: user._id,
        amount: 0,
    })
    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                //
                [name]: Number(value),
                //
            }
        })
    }

    async function paymentHandler() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:4000/api/v1/moneyTransfer", formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setBalance(response.data.senderBalance);
                navigate("/dashboard");
            }
            else toast.error(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">

                <h2 className="text-3xl font-bold text-center mb-8">Send Money</h2>

                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                        {user.firstName[0].toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-bold">{user.firstName}</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (in Rs)
                        </label>
                        <input
                            name="amount"
                            onChange={changeHandler}
                            type="number"
                            placeholder="Enter amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <button onClick={paymentHandler}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Send;