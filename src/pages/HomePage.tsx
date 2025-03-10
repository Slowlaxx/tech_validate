import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Code2, Users, Building2, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-12 sm:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Validate Your Tech Skills
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              Take tests to prove your programming knowledge and connect with companies looking for your skills.
            </p>
            {!isAuthenticated && (
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Get started
                  </Link>
                </div>
                <div className="ml-3 inline-flex">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            )}
            {isAuthenticated && user?.role === 'candidate' && (
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/skills"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Manage Skills
                  </Link>
                </div>
                <div className="ml-3 inline-flex">
                  <Link
                    to="/tests"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Take Tests
                  </Link>
                </div>
              </div>
            )}
            {isAuthenticated && user?.role === 'company' && (
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/candidates"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Find Candidates
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                A simple process to validate your skills and connect with companies
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Code2 className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Add Your Skills
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Select the programming languages and technologies you're proficient in from our comprehensive list.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Take Skill Tests
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Validate your knowledge by taking our comprehensive tests for each programming language.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Building2 className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Connect with Companies
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Companies can find you based on your validated skills and professional profile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Languages Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Supported Languages
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Validate your skills in these popular programming languages
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {[
              'JavaScript',
              'TypeScript',
              'Python',
              'Java',
              'C#',
              'PHP',
              'Ruby',
              'Go',
              'Swift',
              'Kotlin',
              'Rust',
              'HTML/CSS'
            ].map((language) => (
              <div
                key={language}
                className="col-span-1 flex justify-center py-8 px-8 bg-gray-50 rounded-lg"
              >
                <span className="text-lg font-medium text-gray-900">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;