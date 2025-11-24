import { useContext, useState } from 'react';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';
import { AppContext } from '../context/AppContext';

const Dashboard = ({ setLoggedin }) => {
    const { balance, setBalance } = useContext(AppContext);

    return (
        <div className="bg-white min-h-screen">
            <Appbar setLoggedin={setLoggedin} />
            <div className="w-full">
                <Balance balance={balance} />
                <Users />
            </div>
        </div>
    );
};
export default Dashboard;