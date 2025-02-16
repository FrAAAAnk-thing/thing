import { createContext, useEffect } from "react";
import { doctors } from "../assets/assets";
import React, {useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₱'
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData, setUserData] = useState(false)

    const loadUserProfileData = async () =>{
        try{

            const {data} = await axios.get(`${backendURL}/api/user/get-profile`, {headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        backendURL,
        userData,
        setUserData,
        loadUserProfileData
    }    

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider