import React from 'react';
import SkillsList from '../components/candidate/SkillsList';

const SkillsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          My Skills
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Manage your skills and take tests to validate your knowledge
        </p>
      </div>

      <div className="mt-6">
        <SkillsList />
      </div>
    </div>
  );
};

export default SkillsPage;