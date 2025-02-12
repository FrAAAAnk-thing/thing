import { createContext } from "react";
import { doctors } from "../assets/assets";
import React, {useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₱'
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)


    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        backendURL
    }    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider