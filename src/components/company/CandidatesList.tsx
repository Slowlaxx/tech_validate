import React, { useState } from 'react';
import { getAllCandidates } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { Candidate, ProgrammingLanguage } from '../../types';
import { CheckCircle, User } from 'lucide-react';

const CandidatesList: React.FC = () => {
  const { availableLanguages } = useSkillsStore();
  const [selectedLanguages, setSelectedLanguages] = useState<ProgrammingLanguage[]>([]);
  const [showValidatedOnly, setShowValidatedOnly] = useState(true);
  
  const candidates = getAllCandidates();
  
  // Filter candidates based on selected languages and validation status
  const filteredCandidates = candidates.filter(candidate => {
    // If no languages are selected, show all candidates
    if (selectedLanguages.length === 0) return true;
    
    // Check if candidate has any of the selected languages
    return candidate.skills.some(skill => 
      selectedLanguages.includes(skill.language) && 
      (!showValidatedOnly || skill.isValidated)
    );
  });
  
  const handleLanguageToggle = (language: ProgrammingLanguage) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    );
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Find Candidates
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Search for candidates with specific skills
        </p>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">Filter by Skills</h4>
            <div className="flex items-center">
              <input
                id="validated-only"
                name="validated-only"
                type="checkbox"
                checked={showValidatedOnly}
                onChange={() => setShowValidatedOnly(!showValidatedOnly)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="validated-only" className="ml-2 block text-sm text-gray-700">
                Show only validated skills
              </label>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableLanguages.map(language => (
              <button
                key={language}
                onClick={() => handleLanguageToggle(language)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedLanguages.includes(language)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No candidates match your criteria.</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <li key={candidate.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {candidate.avatar ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={candidate.avatar}
                        alt={candidate.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {candidate.location || 'Location not specified'}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills
                        .filter(skill => 
                          (selectedLanguages.length === 0 || selectedLanguages.includes(skill.language)) &&
                          (!showValidatedOnly || skill.isValidated)
                        )
                        .map(skill => (
                          <span
                            key={skill.language}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              skill.isValidated
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {skill.language}
                            {skill.isValidated && (
                              <CheckCircle className="ml-1 h-3 w-3 text-green-600" />
                            )}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                {candidate.bio && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {candidate.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;