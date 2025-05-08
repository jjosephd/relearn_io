import React from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Props {
  messages: Message[];
}

const ChatDisplay: React.FC<Props> = ({ messages }) => {
  return (
    <div className="w-full max-w-3xl mb-6 overflow-y-auto h-96 bg-base-100 rounded-box p-4 shadow-inner">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
        >
          <div className="chat-bubble">{msg.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
