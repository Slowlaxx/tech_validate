import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { Candidate, ProgrammingLanguage, Skill, SkillLevel } from '../../types';

const SkillsList: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { availableLanguages } = useSkillsStore();
  
  const candidate = user as Candidate;
  
  if (!candidate || candidate.role !== 'candidate') {
    return <div>Loading...</div>;
  }

  const handleAddSkill = (language: ProgrammingLanguage) => {
    const newSkill: Skill = {
      language,
      level: 'beginner',
      isValidated: false
    };
    
    const updatedSkills = [...candidate.skills, newSkill];
    updateUser({ skills: updatedSkills });
  };

  const handleRemoveSkill = (language: ProgrammingLanguage) => {
    const updatedSkills = candidate.skills.filter(skill => skill.language !== language);
    updateUser({ skills: updatedSkills });
  };

  const handleUpdateLevel = (language: ProgrammingLanguage, level: SkillLevel) => {
    const updatedSkills = candidate.skills.map(skill => 
      skill.language === language ? { ...skill, level, isValidated: false } : skill
    );
    updateUser({ skills: updatedSkills });
  };

  // Filter out languages that are already added
  const availableToAdd = availableLanguages.filter(
    lang => !candidate.skills.some(skill => skill.language === lang)
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Skills</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Add skills and take tests to validate your knowledge
          </p>
        </div>
        <div className="relative">
          {availableToAdd.length > 0 && (
            <div className="group">
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Skill
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {availableToAdd.map((language) => (
                    <button
                      key={language}
                      onClick={() => handleAddSkill(language)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {candidate.skills.length === 0 ? (
        <div className="px-4 py-5 sm:p-6 text-center">
          <p className="text-gray-500">You haven't added any skills yet.</p>
          <p className="mt-2 text-sm text-gray-500">
            Add skills to showcase your expertise and take tests to validate them.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {candidate.skills.map((skill) => (
            <li key={skill.language} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {skill.isValidated ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{skill.language}</div>
                    <div className="text-sm text-gray-500">
                      Level: {skill.level}
                      {skill.score && ` • Score: ${skill.score}%`}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={skill.level}
                    onChange={(e) => handleUpdateLevel(
                      skill.language, 
                      e.target.value as SkillLevel
                    )}
                    className="block text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  
                  {!skill.isValidated && (
                    <Link
                      to={`/test/${skill.language}/${skill.level}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Take Test
                    </Link>
                  )}
                  
                  <button
                    onClick={() => handleRemoveSkill(skill.language)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillsList;