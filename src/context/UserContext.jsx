// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [btnLoading, setBtnLoading] = useState(false);

    async function loginUser(email, navigate) { 
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/login`, { email });

            toast.success(data.message);
            localStorage.setItem("verifyToken", data.verifyToken);
            console.log("Received token:", data.verifyToken);
            navigate("/verify");
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong!";
            console.log(errMsg);
        } finally {
            setBtnLoading(false);
        }
    }

    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false)

    async function verifyUser(otp, navigate, fetchChats) { 
        const verifyToken = localStorage.getItem("verifyToken");
        setBtnLoading(true);

        if(!verifyToken) return toast.error("Token not found!");

        try {
            const { data } = await axios.post(`${server}/api/user/verify`, { otp, verifyToken });

            toast.success(data.message);
            localStorage.clear();
            localStorage.setItem("token", data.token);
            console.log("Received token:", data.verifyToken);
            navigate("/");
            setIsAuth(true);
            setUser(data.user);
            fetchChats();
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong!";
            toast.error(errMsg);
        } finally {
            setBtnLoading(false);
        }
    }

    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        try {
            const { data } = await axios.get(`${server}/api/user/me`, {
                headers : {
                    token : localStorage.getItem("token"),
                }
            });
            setIsAuth(true);
            setUser(data);
            setLoading(false);
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong!";
            console.log(errMsg);
            setIsAuth(false);
            setLoading(false);
        }
    }

    const logoutHandler = (navigate) => {
        localStorage.clear();
        setIsAuth(false);
        setUser([]);
        toast.success("Logged out successfully!");
        navigate("/login");
    }

    useEffect(() => {
        fetchUser();
    })

    return (
        <UserContext.Provider value={{ loginUser, btnLoading, verifyUser, isAuth, setIsAuth, user, loading, logoutHandler }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
