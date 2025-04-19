import React from 'react'
import { ChatData } from '../context/ChatContext';

const header = () => {
    const {chats} = ChatData();
  return (
    <div>
        <p className='text-lg mb-6'>Hello, how can I help you today?</p>
        {chats && chats.length === 0 &&(
            <p className='text-lg mb-6'>Create new chat to continue</p>
        )}
    </div>
  )
}

export default header