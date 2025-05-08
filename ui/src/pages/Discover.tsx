import React, { useState } from 'react';
import axios from 'axios';
import ChatDisplay from '../components/ChatDisplay';
import ChatBox from '../components/ChatBox';
import ResultCards from '../components/ResultCards';
import Spinner from '../components/Spinner';
import { Message } from '../types/messages';

interface Message {
  role: 'user' | 'ai';
  content: string;
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

const Discover = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleUserMessage = async (input: string) => {
    const createMessage = (role: 'user' | 'ai', content: string): Message => ({
      role,
      content,
    });

    const newMessages = [...messages, createMessage('user', input)];

    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/query', {
        query: input,
      });

      const { filters, explanation } = response.data;

      const matchRes = await axios.get(
        'http://localhost:5000/schools/discover',
        {
          params: filters,
        }
      );

      const aiReply =
        explanation || "Here's what we found based on your request.";
      setMessages([...newMessages, { role: 'ai', content: aiReply }]);
      setSchools(matchRes.data.schools || []);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'ai',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <ChatDisplay messages={messages} />
      <ChatBox onSend={handleUserMessage} locked={locked} />
      {loading && <Spinner />}
      {schools.length > 0 && <ResultCards schools={schools} />}
    </div>
  );
};

export default Discover;
