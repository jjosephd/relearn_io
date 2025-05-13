import React, { useState } from 'react';
import {
  ChatBubbleLeftIcon,
  UserIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import ResultCards from './ResultCards';
interface Message {
  role: 'user' | 'ai' | 'none';
  content: string;
}

interface Props {
  messages: Message[];
  schools?: School[];
}
interface School {
  school_name: string;
  state: string;
  city?: string;
  admission_rate?: number;
  in_state_tuition?: number;
  out_of_state_tuition?: number;
  matched_program?: string;
}

const ChatDisplay: React.FC<Props> = ({ messages, schools }) => {
  const [showRawMap, setShowRawMap] = useState<Record<number, boolean>>({});

  const toggleRaw = (idx: number) => {
    setShowRawMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="w-full max-w-3xl mb-6 overflow-y-auto h-[60vh] rounded-xl  p-4 space-y-4">
      {messages.map((msg, idx) => {
        const isAssistant = msg.role === 'ai';
        const isUser = msg.role === 'user';
        const isInfo = msg.role === 'none';
        const showRaw = showRawMap[idx];

        const bgColor = isAssistant
          ? 'bg-[#1e293b]' // assistant
          : isInfo
          ? 'bg-[#334155] border border-slate-600'
          : 'bg-base-200'; // user

        const icon = isAssistant ? (
          <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg w-10 h-10 flex items-center justify-center">
            <ChatBubbleLeftIcon className="text-white w-5 h-5" />
          </div>
        ) : isInfo ? (
          <div className="p-2 rounded-full bg-slate-600 w-10 h-10 flex items-center justify-center">
            <InformationCircleIcon className="text-white w-5 h-5" />
          </div>
        ) : (
          <div className="p-2 rounded-full bg-gray-600 w-10 h-10 flex items-center justify-center">
            <UserIcon className=" w-5 h-5" />
          </div>
        );

        return (
          <div
            key={idx}
            className={`flex items-start gap-4 p-4 rounded-xl shadow-md ${bgColor}`}
          >
            {icon}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-semibold text-primary capitalize">
                  {msg.role === 'none' ? 'System' : msg.role}
                </p>
                {isAssistant && (
                  <button
                    className="text-xs text-emerald-400 underline"
                    onClick={() => toggleRaw(idx)}
                  >
                    {showRaw ? 'Hide Raw' : 'Show Raw'}
                  </button>
                )}
              </div>
              <div className="text-[15px] leading-relaxed text-primary whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </div>
        );
      })}
      {schools && schools.length > 0 && (
        <div className="mt-4">
          <ResultCards schools={schools} />
        </div>
      )}
    </div>
  );
};

export default ChatDisplay;
