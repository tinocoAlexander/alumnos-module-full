import React from 'react';
import { Reply, Trash2 } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { Message } from '../../types';

interface MessageContentProps {
  message: Message | null;
  onReply: () => void;
  onDelete: (message: Message) => void;
}

const MessageContent: React.FC<MessageContentProps> = ({
  message,
  onReply,
  onDelete,
}) => {
  if (!message) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Reply className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-black mb-2">
            No message selected
          </h3>
          <p className="text-gray-600">
            Select a message from the list to view its content
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-6">
        {/* Message Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-black">
              {message.subject}
            </h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>From: {message.senderName}</span>
              <span>{message.timestamp.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onReply}>
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(message)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Message Content */}
        <div className="border-t border-gray-200 pt-6">
          <div className="prose max-w-none">
            <p className="text-gray-900 whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MessageContent;