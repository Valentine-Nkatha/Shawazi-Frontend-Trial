"use client";

import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { formatTimestamp } from '../utils/dateUtils';
import { Send, User } from 'lucide-react';
import { useGetUsers } from '@/app/hooks/useGetUsers';
import UserCard from '../hooks/userCard/UserCard';
import useChatMessages from '@/app/hooks/useChatMessages';
import SideBar from "../components/SideBarPwa";

interface UserType {
    id: string;
    first_name: string;
    last_name: string; 
    role: string;
}

interface ErrorType {
    message: string;
}

const ChatRoom: React.FC = () => {
    const { users, loading, error: usersError } = useGetUsers();
    const [inputMessage, setInputMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [availableUsers, setAvailableUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const messagesEndRef = useScrollToBottom<HTMLDivElement>();
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { messages, sendMessage } = useChatMessages(currentUserId || '', currentUserRole || '');

    useEffect(() => {
        const userRole = getCookie('userRole');
        const userName = getCookie('userName') as string;
        const userId = getCookie('userId') as string;
        setCurrentUserRole(userRole as string);
        setCurrentUserName(userName);
        setCurrentUserId(userId);
    }, []);

    useEffect(() => {
        if (!loading && !usersError) {
            let filteredUsers: UserType[] = [];
            if (currentUserRole === 'lawyer') {
                filteredUsers = users.filter((user: UserType) => user.role === 'buyer' || user.role === 'seller');
            } else if (currentUserRole === 'buyer') {
                filteredUsers = users.filter((user: UserType) => user.role === 'seller');
            } else if (currentUserRole === 'seller') {
                filteredUsers = users.filter((user: UserType) => user.role === 'buyer');
            }
            setAvailableUsers(filteredUsers);
        }
    }, [loading, usersError, users, currentUserRole]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '' || !selectedUser) {
            console.error('Cannot send message: either message is empty or no user selected');
            return;
        }
        setSendingMessage(true);
        setErrorMessage(null);
        try {
            await sendMessage(inputMessage, selectedUser.id);
            setInputMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
            setErrorMessage('Failed to send message. Please try again.');
        } finally {
            setSendingMessage(false);
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSendMessage();
        }
    };

    const filteredMessages = messages.filter((message) => {
        const sender = String(message.sender || '');
        const content = String(message.content || '');
        return sender.toLowerCase().includes(searchTerm.toLowerCase()) || content.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const startConversation = (user: UserType) => {
        setSelectedUser(user);
        console.log(`Starting conversation with ${user.first_name} ${user.last_name} (${user.role})`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }
    if (usersError) {
        return (
            <div className="flex justify-center items-center h-full">
                {/* Error handling for usersError using the defined ErrorType */}
                Error: {(typeof usersError === 'object' && 'message' in usersError) ? (usersError as ErrorType).message : 'An unknown error occurred'}
            </div>
        );
    }

    const getUserListTitle = () => {
        switch (currentUserRole) {
            case 'buyer':
                return 'Available Sellers';
            case 'seller':
                return 'Available Buyers';
            case 'lawyer':
                return 'Available Users';
            default:
                return 'Users';
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 font-jost h-screen">
            <SideBar userRole={''} />
            <div className="flex flex-col w-full md:w-1/4 bg-white border-r border-gray-200 p-4 shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                </div>
                <h2 className="font-semibold mt-4">{getUserListTitle()}</h2>
                <div className="flex-grow overflow-y-auto mt-2">
                    {availableUsers.length > 0 ? (
                        availableUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                startConversation={() => startConversation(user)}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No users available</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-grow w-full">
                <header className="bg-white shadow-sm p-3 flex items-center border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-green-700 flex-1">
                        {selectedUser ? `Chat with ${selectedUser.first_name} ${selectedUser.last_name} (${selectedUser.role})` : 'Select a user to chat'}
                    </h1>
                    <User size={24} className="text-green-700" />
                </header>
                <main className="flex-grow overflow-y-auto p-4">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === currentUserId ? 'text-right' : 'text-left'}`}>
                                <p className={`text-sm ${message.sender === currentUserId ? 'text-green-700' : 'text-gray-800'}`}>
                                    <strong>{message.sender === currentUserId ? currentUserName : selectedUser?.first_name}:</strong> {message.content}
                                </p>
                                <p className="text-xs text-gray-400">{formatTimestamp(typeof message.timestamp === 'number' ? message.timestamp : new Date(message.timestamp).getTime())}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet. Start chatting!</p>
                    )}
                    <div ref={messagesEndRef}></div>
                </main>
                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-2 text-center">
                        {errorMessage}
                    </div>
                )}
                <footer className="bg-white p-12 border-t border-gray-200 flex gap-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={sendingMessage}
                        className={`w-[80%] p-2 border border-foreground rounded focus:outline-none focus:ring-2 focus:ring-green-700 ${sendingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={sendingMessage || inputMessage.trim() === ''}
                        className={`bg-green-700 text-white px-4 py-2 rounded ${sendingMessage || inputMessage.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Send />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ChatRoom;
