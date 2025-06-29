import React from 'react';
import { Link } from 'react-router-dom';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import Button from '../components/UI/Button';

const ServerError: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* 500 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-black mb-4">500</div>
          <div className="h-32 w-32 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-black mb-4">
          Server Error
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Something went wrong on our end. We're working to fix this issue. 
          Please try again in a few minutes.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button onClick={handleRefresh} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            If the problem persists, please contact support:
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Email: support@university.edu
            </p>
            <p className="text-sm text-gray-600">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;