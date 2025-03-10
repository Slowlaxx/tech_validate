import React from 'react';
import TestManagement from '../../components/admin/TestManagement';

const AdminTestsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Test Management
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Create and manage test questions for different programming languages and difficulty levels
        </p>
      </div>

      <div className="mt-6">
        <TestManagement />
      </div>
    </div>
  );
};

export default AdminTestsPage;