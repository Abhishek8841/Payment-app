import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userDetails, SetUserDetails] = useState({});
    const [balance, setBalance] = useState(0);
    const value = {
        userDetails,
        SetUserDetails,
        balance,
        setBalance,
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}