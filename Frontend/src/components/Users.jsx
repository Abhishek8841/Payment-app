import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
export const Users = () => {
    const [users, setUsers] = useState([]);

    async function help() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:4000/api/v1/getAllUser", {
                headers: {
                    Authorization: "Bearer " + token,
                },
                withCredentials: true
            });
            if (response.data.success) {
                setUsers(response.data.allUsers);
            }
            else toast.error(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => { help() }, []);
    async function changeHandler(event) {
        if (event.target.value == "") { help(); return; };
        const value = event.target.value;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:4000/api/v1/searchUser?filter=" + value, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                withCredentials: true
            });
            if (response.data.success) {
                setUsers(response.data.users);
            }
            else toast.error(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="px-8 mt-6 mb-4">
            <div className="font-bold text-xl mb-4">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={changeHandler}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-2 border rounded border-slate-300 focus:outline-none focus:border-black"
                />
            </div>
            <div className="mt-4">
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center my-4">
            <div className="flex items-center">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center mr-3">
                    <div className="text-lg font-bold text-gray-600">
                        {user?.firstName?.[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="font-semibold">
                        {user?.firstName} {user?.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <button onClick={() => { navigate("/send", { state: { user } }) }}
                    type="button"
                    className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                    Send Money
                </button>
            </div>
        </div>
    );
}