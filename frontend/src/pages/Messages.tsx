import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import MessageList from '../components/Messages/MessageList';
import MessageContent from '../components/Messages/MessageContent';
import ComposeMessage from '../components/Messages/ComposeMessage';
import { Message } from '../types';

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: '',
  });

  // Mock messages data
  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah Johnson',
      receiverId: '1',
      receiverName: 'John Doe',
      subject: 'Group Project Discussion',
      content: 'Hi John, I wanted to discuss our upcoming group project for CS101. Are you available to meet this week?',
      timestamp: new Date('2024-01-20T14:30:00'),
      read: false,
    },
    {
      id: '2',
      senderId: '3',
      senderName: 'Mike Chen',
      receiverId: '1',
      receiverName: 'John Doe',
      subject: 'Study Group Formation',
      content: 'Hey! I\'m organizing a study group for the upcoming midterms. Would you like to join us?',
      timestamp: new Date('2024-01-20T10:15:00'),
      read: false,
    },
    {
      id: '3',
      senderId: '4',
      senderName: 'Emily Davis',
      receiverId: '1',
      receiverName: 'John Doe',
      subject: 'Assignment Clarification',
      content: 'Hi John, I had a question about the assignment requirements. Could you help clarify the submission format?',
      timestamp: new Date('2024-01-19T16:45:00'),
      read: true,
    },
  ];

  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const filteredMessages = messages.filter(message =>
    message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(prev =>
        prev.map(m => (m.id === message.id ? { ...m, read: true } : m))
      );
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.content) {
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'John Doe',
      receiverId: '2',
      receiverName: newMessage.to,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date(),
      read: true,
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage({ to: '', subject: '', content: '' });
    setShowCompose(false);
  };

  const handleReply = () => {
    if (!selectedMessage) return;
    
    setNewMessage({
      to: selectedMessage.senderName,
      subject: `Re: ${selectedMessage.subject}`,
      content: '',
    });
    setShowCompose(true);
  };

  const handleDeleteMessage = (message: Message) => {
    setMessageToDelete(message);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    
    setDeleteLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev => prev.filter(m => m.id !== messageToDelete.id));
      if (selectedMessage?.id === messageToDelete.id) {
        setSelectedMessage(null);
      }
      setShowDeleteConfirm(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleMessageChange = (field: string, value: string) => {
    setNewMessage(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Messages</h1>
            <p className="mt-2 text-gray-600">
              Communicate with other students
            </p>
          </div>
          <Button onClick={() => setShowCompose(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Message List */}
          <div className="lg:col-span-1">
            <MessageList
              messages={filteredMessages}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedMessage={selectedMessage}
              onMessageSelect={handleMessageSelect}
              onMessageDelete={handleDeleteMessage}
            />
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {showCompose ? (
              <ComposeMessage
                newMessage={newMessage}
                onMessageChange={handleMessageChange}
                onSend={handleSendMessage}
                onCancel={() => setShowCompose(false)}
              />
            ) : (
              <MessageContent
                message={selectedMessage}
                onReply={handleReply}
                onDelete={handleDeleteMessage}
              />
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setMessageToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Message"
        message={`Are you sure you want to delete the message "${messageToDelete?.subject}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </Layout>
  );
};

export default Messages;