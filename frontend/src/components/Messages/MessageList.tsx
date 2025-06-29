import React from 'react';
import { Search, Trash2 } from 'lucide-react';
import Card from '../UI/Card';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedMessage: Message | null;
  onMessageSelect: (message: Message) => void;
  onMessageDelete: (message: Message) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  searchQuery,
  onSearchChange,
  selectedMessage,
  onMessageSelect,
  onMessageDelete,
}) => {
  return (
    <Card padding="none">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
          />
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedMessage?.id === message.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className={`text-sm font-medium truncate ${!message.read ? 'text-black' : 'text-gray-600'}`}>
                    {message.senderName}
                  </p>
                  {!message.read && (
                    <div className="h-2 w-2 bg-black rounded-full"></div>
                  )}
                </div>
                <p className={`text-sm mt-1 truncate ${!message.read ? 'text-black' : 'text-gray-500'}`}>
                  {message.subject}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMessageDelete(message);
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MessageList;