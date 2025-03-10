import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { getAllCompanies } from '../../store/authStore';
import { Candidate, CustomTest } from '../../types';
import { Building2, Calendar } from 'lucide-react';

const CandidateCustomTestsList: React.FC = () => {
  const { user } = useAuthStore();
  const { customTests } = useSkillsStore();
  const candidate = user as Candidate;
  
  const companies = getAllCompanies();
  
  // Filter tests where this candidate is invited
  const invitedTests = customTests.filter(test => 
    test.invitedCandidates.includes(candidate.id)
  );
  
  if (invitedTests.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Custom Tests
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-center">
          <p className="text-gray-500">You haven't been invited to any custom tests yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Companies will invite you to take custom tests to evaluate your skills.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Custom Tests
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Take custom tests created by companies
        </p>
      </div>
      
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {invitedTests.map((test) => {
            const company = companies.find(c => c.id === test.companyId);
            return (
              <li key={test.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{test.title}</h4>
                    <div className="mt-1 flex items-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {test.language}
                      </span>
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {test.difficulty}
                      </span>
                      {company && (
                        <span className="ml-2 flex items-center text-sm text-gray-500">
                          <Building2 className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                          {company.name}
                        </span>
                      )}
                      <span className="ml-2 flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                        {test.questions.length} questions
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{test.description}</p>
                  </div>
                  <div>
                    <Link
                      to={`/custom-test/${test.id}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Take Test
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CandidateCustomTestsList;