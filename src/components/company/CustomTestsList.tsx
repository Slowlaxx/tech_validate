import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { getAllCandidates } from '../../store/authStore';
import { Company, CustomTest } from '../../types';
import { Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

const CustomTestsList: React.FC = () => {
  const { user } = useAuthStore();
  const { customTests, deleteCustomTest, inviteCandidateToTest } = useSkillsStore();
  const company = user as Company;
  
  const candidates = getAllCandidates();
  
  // Filter tests created by this company
  const companyTests = customTests.filter(test => test.companyId === company.id);
  
  const handleDeleteTest = (testId: string) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      deleteCustomTest(testId);
    }
  };
  
  const handleInviteCandidate = (testId: string, candidateId: string) => {
    inviteCandidateToTest(testId, candidateId);
  };
  
  if (companyTests.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Custom Tests
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-center">
          <p className="text-gray-500">You haven't created any custom tests yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Create custom tests to evaluate candidates for specific skills.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your Custom Tests
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your custom tests and candidate invitations
        </p>
      </div>
      
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {companyTests.map((test) => (
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
                    <span className="ml-2 flex items-center text-sm text-gray-500">
                      <Users className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                      {test.invitedCandidates.length} candidates
                    </span>
                    <span className="ml-2 flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                      {test.questions.length} questions
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{test.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleDeleteTest(test.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700">Invited Candidates</h5>
                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {candidates.map((candidate) => {
                    const isInvited = test.invitedCandidates.includes(candidate.id);
                    return (
                      <div 
                        key={candidate.id} 
                        className={`border rounded-md p-3 ${
                          isInvited 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                            <p className="text-xs text-gray-500">{candidate.email}</p>
                          </div>
                          {isInvited ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <button
                              onClick={() => handleInviteCandidate(test.id, candidate.id)}
                              className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Invite
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomTestsList;