import React from 'react';
import SkillTest from '../components/candidate/SkillTest';

const TestPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Skill Test
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Answer the questions to validate your knowledge
        </p>
      </div>

      <div className="mt-6">
        <SkillTest />
      </div>
    </div>
  );
};

export default TestPage;