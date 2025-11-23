import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userDetails, SetUserDetails] = useState({});
    const value = {
        userDetails,
        SetUserDetails,
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}