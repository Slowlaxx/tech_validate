import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, createUser } from '../../store/authStore';
import { UserRole } from '../../types';

const RegisterForm: React.FC = () => {
  const [role, setRole] = useState<UserRole>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = role === 'candidate' 
        ? {
            email,
            password,
            role: 'candidate' as const,
            name,
            bio: '',
            location: '',
            skills: []
          }
        : role === 'company' 
        ? {
            email,
            password,
            role: 'company' as const,
            name,
            description: '',
            industry: '',
            location: '',
            website: '',
            customTests: []
          }
        : {
            email,
            password,
            role: 'admin' as const,
            name
          };

      const newUser = createUser(userData);
      login(newUser);
      
      if (role === 'candidate') {
        navigate('/skills');
      } else if (role === 'company') {
        navigate('/candidates');
      } else {
        navigate('/admin/tests');
      }
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <div className="mt-2 flex space-x-4">
            <div className="flex items-center">
              <input
                id="candidate"
                name="role"
                type="radio"
                checked={role === 'candidate'}
                onChange={() => setRole('candidate')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="candidate" className="ml-2 block text-sm text-gray-700">
                Candidate
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="company"
                name="role"
                type="radio"
                checked={role === 'company'}
                onChange={() => setRole('company')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="company" className="ml-2 block text-sm text-gray-700">
                Company
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="admin"
                name="role"
                type="radio"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="admin" className="ml-2 block text-sm text-gray-700">
                Admin
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {role === 'candidate' ? 'Full Name' : role === 'company' ? 'Company Name' : 'Admin Name'}
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;