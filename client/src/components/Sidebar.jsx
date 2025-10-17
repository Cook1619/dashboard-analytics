import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, TrendingUp, Home } from 'lucide-react';

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col w-64 bg-white shadow-sm">
      <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
        <BarChart3 className="h-8 w-8 text-white" />
        <span className="ml-2 text-xl font-bold text-white">Dashboard</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;