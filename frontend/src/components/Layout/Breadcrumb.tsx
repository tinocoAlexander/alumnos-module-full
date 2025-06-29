import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    ...pathnames.slice(1).map((name, index) => ({
      label: name.charAt(0).toUpperCase() + name.slice(1),
      path: `/${pathnames.slice(0, index + 2).join('/')}`,
    })),
  ];

  if (pathnames.length === 0 || pathnames[0] === 'dashboard') {
    return null;
  }

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            to="/dashboard"
            className="text-gray-500 hover:text-black transition-colors duration-200 flex items-center"
          >
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.path}>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-black font-medium">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-black transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;