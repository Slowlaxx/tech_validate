import React, { useState } from 'react';
import CustomTestForm from '../../components/company/CustomTestForm';
import CustomTestsList from '../../components/company/CustomTestsList';

const CompanyTestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Custom Tests
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Create and manage custom tests for candidates
        </p>
      </div>

      <div className="mt-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as 'list' | 'create')}
          >
            <option value="list">My Tests</option>
            <option value="create">Create Test</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('list')}
                className={`${
                  activeTab === 'list'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                My Tests
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`${
                  activeTab === 'create'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Create Test
              </button>
            </nav>
          </div>
        </div>
        
        <div className="mt-6">
          {activeTab === 'list' ? (
            <CustomTestsList />
          ) : (
            <CustomTestForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyTestsPage;