import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Search, MessageSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onEditProfile: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  onLogout, 
  onEditProfile 
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!isOpen) return null;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/students', label: 'Students', icon: Search },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-black">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.studentId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-colors ${
                isActivePath(item.path)
                  ? 'text-black bg-gray-50 border-r-2 border-black'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Profile Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
          <button
            onClick={() => {
              onEditProfile();
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;