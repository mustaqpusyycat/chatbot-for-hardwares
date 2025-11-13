
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [inputText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex items-end space-x-3 bg-gray-800 p-2 rounded-xl border border-gray-700 shadow-lg"
    >
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about an Arduino project..."
        rows={1}
        className="flex-1 bg-transparent p-2 text-gray-200 resize-none outline-none placeholder-gray-500 max-h-48"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputText.trim()}
        className="flex-shrink-0 bg-cyan-600 text-white rounded-lg h-10 w-10 flex items-center justify-center transition-colors duration-200 enabled:hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        <SendIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInput;
