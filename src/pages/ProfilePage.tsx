import React from 'react';
import { useAuthStore } from '../store/authStore';
import CandidateProfileForm from '../components/candidate/ProfileForm';
import CompanyProfileForm from '../components/company/ProfileForm';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Your Profile
        </h1>
      </div>

      <div className="mt-6">
        {user.role === 'candidate' ? (
          <CandidateProfileForm />
        ) : (
          <CompanyProfileForm />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;