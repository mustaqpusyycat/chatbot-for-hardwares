
import React from 'react';
import { marked } from 'marked';
import { Message, Role } from '../types';
import { UserIcon, MicrochipIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserModel = message.role === Role.Model;

  const renderedHtml = isUserModel ? marked.parse(message.text) : message.text;

  const messageContainerClasses = `flex items-start gap-3 md:gap-4 ${
    isUserModel ? '' : 'flex-row-reverse'
  }`;
  
  const bubbleClasses = `max-w-xl lg:max-w-3xl px-4 py-3 rounded-2xl shadow-md ${
    isUserModel
      ? 'bg-gray-800 text-gray-200 rounded-tl-none'
      : 'bg-cyan-600 text-white rounded-tr-none'
  }`;

  const iconClasses = `flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center shadow-inner ${
      isUserModel ? 'bg-gray-700 text-cyan-400' : 'bg-cyan-500 text-white'
  }`;

  return (
    <div className={messageContainerClasses}>
      <div className={iconClasses}>
        {isUserModel ? <MicrochipIcon className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
      </div>
      <div className={bubbleClasses}>
        {isUserModel ? (
          <div
            className="prose prose-sm prose-invert prose-p:my-2 prose-headings:my-3 prose-pre:bg-gray-900 prose-pre:p-3 prose-pre:rounded-md prose-code:text-amber-300"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        ) : (
          <p>{renderedHtml}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
