import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Candidate } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

const TestsPage: React.FC = () => {
  const { user } = useAuthStore();
  const candidate = user as Candidate;
  
  if (!candidate || candidate.role !== 'candidate') {
    return <div>Loading...</div>;
  }
  
  // Group skills by validation status
  const pendingSkills = candidate.skills.filter(skill => !skill.isValidated);
  const validatedSkills = candidate.skills.filter(skill => skill.isValidated);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Skill Tests
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Take tests to validate your programming skills
        </p>
      </div>

      <div className="mt-6 space-y-8">
        {pendingSkills.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Pending Validation
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Take tests for these skills to validate your knowledge
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {pendingSkills.map((skill) => (
                <li key={skill.language}>
                  <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{skill.language}</p>
                        <p className="text-sm text-gray-500">Level: {skill.level}</p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`/test/${skill.language}/${skill.level}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Take Test
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">You don't have any pending skills to validate.</p>
              <p className="mt-2 text-sm text-gray-500">
                <Link to="/skills" className="text-indigo-600 hover:text-indigo-500">
                  Add more skills
                </Link> to take tests for them.
              </p>
            </div>
          </div>
        )}

        {validatedSkills.length > 0 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Validated Skills
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Skills you have successfully validated
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {validatedSkills.map((skill) => (
                <li key={skill.language}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{skill.language}</p>
                      <p className="text-sm text-gray-500">
                        Level: {skill.level} • Score: {skill.score}%
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPage;