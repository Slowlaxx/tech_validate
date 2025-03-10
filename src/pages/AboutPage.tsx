import React from 'react';
import { Code2, CheckCircle, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          About TechValidate
        </h1>
      </div>

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-500">
              TechValidate is a platform designed to help developers validate their programming skills and connect with companies looking for specific technical expertise.
            </p>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8">Our Mission</h2>
            <p className="text-gray-500">
              Our mission is to create a trusted ecosystem where technical skills can be objectively validated, helping both candidates and companies make better connections.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">For Developers</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Showcase your skills with validated tests and stand out to potential employers.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Skill Validation</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Our tests are designed by industry experts to accurately assess technical proficiency.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">For Companies</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Find pre-validated candidates with the exact skills your projects require.
                </p>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8">How It Works</h2>
            <ol className="mt-4 space-y-4 text-gray-500">
              <li>
                <strong>Create a profile</strong> - Sign up as a candidate or company and complete your profile.
              </li>
              <li>
                <strong>Add skills</strong> - Candidates can add programming languages they're proficient in.
              </li>
              <li>
                <strong>Take tests</strong> - Validate your skills by taking our comprehensive tests.
              </li>
              <li>
                <strong>Connect</strong> - Companies can search for candidates with validated skills.
              </li>
            </ol>
            
            <h2 className="text-xl font-bold text-gray-900 mt-8">Contact Us</h2>
            <p className="text-gray-500">
              Have questions or feedback? We'd love to hear from you. Contact us at <a href="mailto:support@techvalidate.example.com" className="text-indigo-600 hover:text-indigo-500">support@techvalidate.example.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;