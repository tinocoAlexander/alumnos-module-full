import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Search, MessageSquare, LogOut, GraduationCap, Settings, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmDialog from '../UI/ConfirmDialog';
import ProfileModal from '../Profile/ProfileModal';
import MobileMenu from './MobileMenu';
import { ProfileFormData } from '../../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutConfirm(false);
  };

  const handleProfileUpdate = async (data: ProfileFormData) => {
    setProfileLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated:', data);
      // In a real app, you would update the user context here
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <GraduationCap className="h-8 w-8 text-black" />
              <span className="text-xl font-bold text-black">UniManage</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/students"
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium flex items-center space-x-1"
              >
                <Search className="h-4 w-4" />
                <span>Students</span>
              </Link>
              <Link
                to="/messages"
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium flex items-center space-x-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-black">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.studentId}</p>
              </div>
              
              <div className="relative group">
                <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile User Avatar */}
            <div className="md:hidden h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        onLogout={() => setShowLogoutConfirm(true)}
        onEditProfile={() => setShowProfileModal(true)}
      />

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Stay Logged In"
        variant="warning"
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSubmit={handleProfileUpdate}
        user={user}
        loading={profileLoading}
      />
    </>
  );
};

export default Header;