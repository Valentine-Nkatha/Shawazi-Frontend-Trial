"use client";
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import ChatRoom from "@/components/chatroom/ChatRoom";


const ChatRoomPage = () => {
    useEffect(() => {
        setCookie('userRole', 'lawyer', { maxAge: 60 * 60 * 24 * 7 }); 
        setCookie('userName', 'Gatweri', { maxAge: 60 * 60 * 24 * 7 }); // Set username cookie

    }, []);

    return <ChatRoom />;
};

export default ChatRoomPage;





