import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RobotSpline from './RobotSpline';

interface RobotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  type: 'bot' | 'user';
  message: string;
}

const RobotModal: React.FC<RobotModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { type: 'bot', message: 'Hello! I\'m your AI Financial Advisor. How can I help you today?' }
  ]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory(prev => [...prev, { type: 'user', message }]);
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        message: 'I\'m analyzing your request. Please give me a moment to provide the best financial advice.' 
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-7xl h-[80vh] bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl overflow-hidden border border-gray-800/50 backdrop-blur-2xl"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors backdrop-blur-sm"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex h-full">
              <div className="w-1/2 h-full relative">
                <RobotSpline />
              </div>

              <div className="w-1/2 h-full flex flex-col bg-gray-900/30 backdrop-blur-xl border-l border-gray-800/50">
                <div className="p-6 border-b border-gray-800/50">
                  <h3 className="text-2xl font-semibold text-white">AI Financial Advisor</h3>
                  <p className="text-base text-gray-400 mt-1">Ask me anything about your finances</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-6 py-3 text-lg backdrop-blur-sm ${
                          chat.type === 'user'
                            ? 'bg-blue-gradient text-white'
                            : 'bg-gray-800/90 text-gray-100'
                        }`}
                      >
                        {chat.message}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-800/50">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800/50 text-white rounded-full px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#33bbcf] backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-gradient text-white rounded-full hover:opacity-90 transition-all text-lg font-medium backdrop-blur-sm"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RobotModal; 

