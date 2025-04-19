import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ChatData } from '../context/ChatContext';
import { CgProfile } from 'react-icons/cg';
import { FaBrain } from 'react-icons/fa';
import { IoSendSharp } from 'react-icons/io5';
import { LoadingSpinnerBig, LoadingSpinnerForChat } from '../components/loading';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#0f0f1a] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-[#1a1a2e] text-xl shadow-lg rounded-full"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingSpinnerBig />
            </div>
          ) : (
            <div
              className="flex-1 p-4 max-h-[70vh] overflow-y-auto mb-20 md:mb-0 custom-scrollbar rounded-xl"
              ref={messageContainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i} className="mb-6 space-y-4">
                    {/* User Message - align right */}
                    <div className="flex justify-end">
                      <div className="flex gap-3 items-center bg-transparent p-4 rounded-xl shadow-md max-w-[80%] transition hover:scale-[1.01]">
                        {/* User Icon */}
                        <div className="bg-white p-2 rounded-full text-indigo-700 text-xl h-10 w-10 flex items-center justify-center">
                          <CgProfile />
                        </div>

                        {/* User Message */}
                        <p className="text-white max-w-full break-words" dangerouslySetInnerHTML={{ __html: e.question }}></p>
                      </div>
                    </div>

                    {/* AI Response - align left */}
                    <div className="flex justify-start">
                      <div className="flex gap-3 items-center bg-transparent p-4 rounded-xl shadow-md max-w-[80%] transition hover:scale-[1.01]">
                        {/* AI Icon */}
                        <div className="bg-white p-2 rounded-full text-green-600 text-xl h-10 w-10 flex items-center justify-center">
                          <FaBrain />
                        </div>

                        {/* AI Response */}
                        <p className="text-white max-w-full break-words" dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                      </div>
                    </div>
                  </div>

                ))
              ) : (
                <p className="text-gray-300">No messages yet</p>
              )}

              {/* Chat Loading Spinner */}
              {newRequestLoading && <LoadingSpinnerForChat />}
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      {chats && chats.length === 0 ? null : (
        <div className="fixed bottom-0 right-0 left-auto p-6 bg-transparent w-full md:w-[75%] shadow-xl rounded-tl-lg rounded-tr-lg">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center gap-4"
          >
            <input
              className="flex-grow p-4 bg-transparent rounded-lg text-white outline-none placeholder-gray-300 shadow-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
              type="text"
              placeholder="Type your message here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button
              className="p-4 bg-transparent hover:bg-indigo-500 rounded-lg text-2xl text-white transition-all duration-300"
              type="submit"
            >
              <IoSendSharp />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
