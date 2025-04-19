import { IoIosCloseCircleOutline } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdOutlineDelete } from "react-icons/md";
import { LoadingSpinner } from "./loading";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-72 bg-[#1a1a1d] text-white p-4 transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:relative md:z-auto shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        className="md:hidden text-3xl text-gray-300 hover:text-gray-400 mb-4"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircleOutline />
      </button>

      {/* Logo */}
      <div className="text-xl font-semibold mb-6 tracking-wide px-1 text-[#a855f7]">
        tarun<span className="text-white">AI</span>
      </div>

      {/* New Chat Button */}
      <button
        onClick={createChat}
        className="w-full mb-4 flex items-center justify-center gap-2 py-2 px-3 bg-[#2a2a31] hover:bg-[#383844] text-[#d4d4d8] rounded-lg text-sm font-medium transition shadow-sm"
      >
        {createLod ? <LoadingSpinner /> : "➕ New Chat"}
      </button>

      {/* Chats Section */}
      <div className="text-xs uppercase text-gray-500 px-1 mb-2 tracking-widest">
        Recent
      </div>

      <div className="overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center justify-between bg-[#2a2a31] hover:bg-[#383844] text-[#d4d4d8] px-3 py-2 rounded-lg mb-2 shadow-sm transition duration-200"
            >
              <button
                className="flex-1 text-left truncate text-sm"
                onClick={() => {
                  setSelected(chat._id);
                  toggleSidebar();
                }}
              >
                {chat.createdAt
                  ? new Date(chat.createdAt).toLocaleString()
                  : "New Chat"}
              </button>
              <button
                onClick={() => deleteChatHandler(chat._id)}
                className="ml-2 text-red-400 hover:text-red-500 text-base transition"
              >
                <MdOutlineDelete />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center mt-4">No chats yet</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-4 w-[90%] left-1/2 transform -translate-x-1/2">
        <button
          onClick={logoutHandler}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium shadow-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
