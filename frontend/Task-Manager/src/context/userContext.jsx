import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if(!accessToken) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.log("User not authenticated",error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    },[])

    const updateUser = (user) => {
        setUser(user);
        localStorage.setItem('token', user.token);
        setLoading(false);
    };
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token');
        
    };
    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider

