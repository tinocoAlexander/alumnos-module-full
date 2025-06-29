import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Search, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Students', value: '2,847', icon: Users, change: '+12%' },
    { name: 'New Messages', value: '23', icon: MessageSquare, change: '+5%' },
    { name: 'Active Searches', value: '147', icon: Search, change: '+18%' },
    { name: 'Avg GPA', value: '3.42', icon: TrendingUp, change: '+0.3%' },
  ];

  const quickActions = [
    {
      name: 'Search Students',
      description: 'Find and filter students by various criteria',
      href: '/students',
      icon: Search,
      color: 'bg-black',
    },
    {
      name: 'Messages',
      description: 'Send and receive messages from other students',
      href: '/messages',
      icon: MessageSquare,
      color: 'bg-gray-800',
    },
  ];

  const recentMessages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      subject: 'Group Project Discussion',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      sender: 'Mike Chen',
      subject: 'Study Group Formation',
      time: '4 hours ago',
      unread: true,
    },
    {
      id: 3,
      sender: 'Emily Davis',
      subject: 'Assignment Clarification',
      time: '1 day ago',
      unread: false,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-black">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening in your university today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.name} hover>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
                    <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action) => (
                <Link key={action.name} to={action.href}>
                  <Card hover className="h-full">
                    <div className="flex items-start space-x-4">
                      <div className={`${action.color} p-3 rounded-lg`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-black">{action.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">Recent Messages</h2>
              <Link
                to="/messages"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                View all
              </Link>
            </div>
            <Card>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {message.sender.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${message.unread ? 'text-black' : 'text-gray-600'}`}>
                          {message.sender}
                        </p>
                        <p className="text-xs text-gray-400">{message.time}</p>
                      </div>
                      <p className={`text-sm mt-1 truncate ${message.unread ? 'text-black' : 'text-gray-500'}`}>
                        {message.subject}
                      </p>
                    </div>
                    {message.unread && (
                      <div className="h-2 w-2 bg-black rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;