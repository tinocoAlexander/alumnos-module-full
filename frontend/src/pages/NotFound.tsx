import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/UI/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-black mb-4">404</div>
          <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
            <Search className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-black mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, 
          or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/dashboard">
            <Button className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Quick links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/students"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Search Students
            </Link>
            <Link
              to="/messages"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Messages
            </Link>
            <Link
              to="/dashboard"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;