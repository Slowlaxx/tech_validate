import React from 'react';
import CandidatesList from '../components/company/CandidatesList';

const CandidatesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Find Candidates
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Search for candidates with validated skills that match your requirements
        </p>
      </div>

      <div className="mt-6">
        <CandidatesList />
      </div>
    </div>
  );
};

export default CandidatesPage;