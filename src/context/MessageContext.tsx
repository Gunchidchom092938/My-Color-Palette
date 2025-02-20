"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
    id: number;
    type: "success" | "error" | "info";
    content: string;
}

interface MessageContextType {
    addMessage: (type: Message["type"], content: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (type: Message["type"], content: string) => {
        const id = Date.now();
        setMessages((prev) => [...prev, { id, type, content }]);

        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        }, 3000);
    };

    return (
        <MessageContext.Provider value={{ addMessage }}>
            {children}
            {/* Overlay */}
            <div
                className={`message-overlay ${
                    messages.length > 0 ? "active" : ""
                }`}
            />

            {/* Messages */}
            <div className="message-container">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.type}`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context)
        throw new Error("useMessage must be used within a MessageProvider");
    return context;
};
