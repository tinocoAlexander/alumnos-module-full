import React from 'react';
import { Send } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';

interface ComposeMessageProps {
  newMessage: {
    to: string;
    subject: string;
    content: string;
  };
  onMessageChange: (field: string, value: string) => void;
  onSend: () => void;
  onCancel: () => void;
}

const ComposeMessage: React.FC<ComposeMessageProps> = ({
  newMessage,
  onMessageChange,
  onSend,
  onCancel,
}) => {
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Compose Message</h2>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <Input
          label="To"
          placeholder="Recipient name or email"
          value={newMessage.to}
          onChange={(e) => onMessageChange('to', e.target.value)}
        />
        <Input
          label="Subject"
          placeholder="Message subject"
          value={newMessage.subject}
          onChange={(e) => onMessageChange('subject', e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Message
          </label>
          <textarea
            placeholder="Type your message here..."
            value={newMessage.content}
            onChange={(e) => onMessageChange('content', e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400 resize-none"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSend}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ComposeMessage;