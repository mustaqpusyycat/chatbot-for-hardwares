
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Role } from './types';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.Model,
      text: "Hello! I'm your AI Hardware Helper. Ask me anything about Arduino, sensors, microcontrollers, or embedded systems. How can I assist you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const systemInstruction = `You are a friendly and expert AI assistant specializing in hardware, acting as a virtual lab assistant. Your name is 'Hardware Helper'.
        You provide clear, concise, and accurate explanations, step-by-step tutorials, and troubleshooting advice for a wide range of topics including:
        - Arduino boards (Uno, Mega, Nano, etc.)
        - Microcontrollers (ESP32, Raspberry Pi Pico, etc.)
        - Sensors (temperature, humidity, ultrasonic, etc.)
        - Electronic components (resistors, capacitors, transistors, LEDs)
        - Circuit design and analysis
        - Embedded systems concepts
        - Basic programming for hardware (C++, MicroPython)
        When providing code, wrap it in markdown code blocks. Be encouraging and helpful to users of all skill levels.`;

        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
          },
        });
      } catch (e) {
        console.error(e);
        setError("Failed to initialize the AI model. Please check the API key and configuration.");
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (isLoading || !inputText.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Message = { role: Role.User, text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      if (!chatRef.current) {
        throw new Error("Chat session is not initialized.");
      }

      const response = await chatRef.current.sendMessage({ message: inputText });
      const modelMessage: Message = { role: Role.Model, text: response.text };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      console.error(e);
      setError(`Sorry, I encountered an error. ${errorMessage}`);
      const errorResponseMessage: Message = { role: Role.Model, text: `Sorry, I encountered an error. Please try again. \n\nDetails: ${errorMessage}` };
      setMessages((prevMessages) => [...prevMessages, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 font-sans">
      <Header />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && <div className="text-red-400 text-center py-2">{error}</div>}
      </div>
      <div className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
