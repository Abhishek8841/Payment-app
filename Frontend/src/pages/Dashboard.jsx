import { useState } from 'react';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    return (
        <div className="bg-white min-h-screen">
            <Appbar />
            <div className="w-full">
                <Balance balance={balance} />
                <Users />
            </div>
        </div>
    );
};
export default Dashboard;