import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
interface Props {
  onSend: (message: string) => void;
  locked: boolean;
  setLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox: React.FC<Props> = ({ onSend, locked, setLocked }) => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleLockedChat = () => {
    setLocked(!locked);
  };

  const handleSubmit = () => {
    if (!message.trim() || locked) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <div className="flex flex-col w-full max-w-3xl fixed bottom-0 p-4 z-50">
      <div className="flex items-start gap-2 w-full">
        <textarea
          className="textarea bg-[#0f172a] text-white border border-emerald-400 w-full resize-none focus:outline-none"
          placeholder="Tell us what you're looking for..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={locked}
          rows={3}
        />
        <div className="flex flex-col pt-2 gap-2 mt-1">
          <button
            className="btn btn-xs bg-[#9333ea] hover:bg-[#7e22ce] text-white border-0 shadow-md"
            onClick={handleSubmit}
            disabled={locked}
          >
            <PaperAirplaneIcon className=" w-3 h-3" />
          </button>
          <button
            className={`btn btn-xs ${
              locked ? 'btn-outline' : 'btn-ghost'
            } border-emerald-500 text-white`}
            onClick={() => toggleLockedChat()}
          >
            {locked ? (
              <LockClosedIcon className="w-3 h-3" />
            ) : (
              <LockOpenIcon className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
