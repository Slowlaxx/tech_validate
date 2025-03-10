import React from 'react';
import CustomTest from '../../components/candidate/CustomTest';

const CustomTestPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Custom Test
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Answer the questions to complete the test
        </p>
      </div>

      <div className="mt-6">
        <CustomTest />
      </div>
    </div>
  );
};

export default CustomTestPage;