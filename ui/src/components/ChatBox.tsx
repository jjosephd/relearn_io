import React, { useState } from 'react';

interface Props {
  onSend: (message: string) => void;
  locked: boolean;
}

const ChatBox: React.FC<Props> = ({ onSend, locked }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim() || locked) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="w-full max-w-3xl flex items-center gap-2">
      <input
        type="text"
        className="input input-bordered flex-grow"
        placeholder="Tell us what you're looking for..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        disabled={locked}
      />
      <button className="btn btn-primary" onClick={handleSubmit} disabled={locked}>
        ✉️
      </button>
      <button
        className={`btn ${locked ? 'btn-outline' : 'btn-ghost'}`}
        onClick={() => alert('Lock toggled (implement state in parent)')}
      >
        🔒
      </button>
    </div>
  );
};

export default ChatBox;
