import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);

    async function fetchResponse() {
        if (prompt === "") return alert("Please enter a prompt");
        setNewRequestLoading(true);
        setPrompt("");
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCqFY-sGT0SuNkaducZ3ZwbxlIeme7A-F4",
                method: "post",
                data: {
                    contents: [{ parts: [{ text: prompt }] }]
                }
            });

            const message = {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            }

            setMessages((prev) => [...prev, message]);
            setNewRequestLoading(false);

            const { data } = await axios.post(`${server}/api/chat/${selected}`, {
                question : prompt,
                answer : response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            }, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
        } catch (error) {
            alert("Error: " + error.message);
            setNewRequestLoading(false);
        }
    };

    const [chats, setChats] = useState([]);

    const [selected, setSelected] = useState(null)

    async function fetchChats() {
        try {
            const { data } = await axios.get(`${server}/api/chat/all`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setChats(data);
            setSelected(data[0]._id)
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

    const [createLod, setCreateLod] = useState(false);

    async function createChat() {
        setCreateLod(true);
        try {
            await axios.post(
                `${server}/api/chat/new`,
                {},
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            fetchChats();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setCreateLod(false);
        }
    }

    const [loading, setLoading] = useState(false)

    async function fetchMessages() {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/api/chat/${selected}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setMessages(data)
            setLoading(false);
        } catch (error) {
            console.log("Error: " + error.message);
            setLoading(false);
        }
    }

    async function deleteChat(id) {
        try {
            const { data } = await axios.delete(`${server}/api/chat/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            fetchChats();
            window.location.reload();
        } catch (error) {
            alert("Something went wrong");
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [selected])


    return <ChatContext.Provider value={{ fetchResponse, messages, prompt, setPrompt, newRequestLoading, chats, createChat, createLod, selected, setSelected, loading, setLoading, deleteChat, fetchChats }}>{children}</ChatContext.Provider>
};

export const ChatData = () => useContext(ChatContext);