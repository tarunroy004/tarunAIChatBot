// src/pages/Verify.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../main';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/loading';
import { ChatData } from '../context/ChatContext';

const Verify = () => {
    const [otp, setOtp] = useState("");
    const { verifyUser, btnLoading } = UserData();
    const { fetchChats } = ChatData;
    const navigate = useNavigate();
    const submitHandler = (e) => {
      e.preventDefault();
      verifyUser(Number(otp), navigate, fetchChats);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center">
            <div className="bg-gradient-to-tr from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-indigo-600/20">
                <h1 className="text-3xl font-bold text-center text-white tracking-wide">Verify OTP</h1>
                <form className="space-y-4" onSubmit={submitHandler}>
                    <div className="flex flex-col">
                        <label htmlFor="otp" className="text-sm font-medium text-purple-300 mb-1">OTP:</label>
                        <input
                            type="number"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            placeholder="Enter the OTP received on your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition duration-200"
                    >
                        {btnLoading? <LoadingSpinner/> : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Verify;
