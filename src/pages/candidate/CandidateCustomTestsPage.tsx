import React from 'react';
import CandidateCustomTestsList from '../../components/candidate/CustomTestsList';

const CandidateCustomTestsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Company Tests
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Take custom tests created by companies
        </p>
      </div>

      <div className="mt-6">
        <CandidateCustomTestsList />
      </div>
    </div>
  );
};

export default CandidateCustomTestsPage;