import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { getAllCandidates } from '../../store/authStore';
import { Company, CustomTest, ProgrammingLanguage, SkillLevel, TestQuestion } from '../../types';
import { PlusCircle, Trash2 } from 'lucide-react';

const CustomTestForm: React.FC = () => {
  const { user } = useAuthStore();
  const { availableLanguages, addCustomTest } = useSkillsStore();
  const company = user as Company;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage | ''>('');
  const [difficulty, setDifficulty] = useState<SkillLevel>('intermediate');
  const [questions, setQuestions] = useState<Partial<TestQuestion>[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  
  const candidates = getAllCandidates();
  
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };
  
  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  
  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };
  
  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options![optionIndex] = value;
    setQuestions(newQuestions);
  };
  
  const toggleCandidate = (candidateId: string) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!language) {
      alert('Please select a programming language');
      return;
    }
    
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }
    
    if (selectedCandidates.length === 0) {
      alert('Please select at least one candidate');
      return;
    }
    
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || q.question.trim() === '') {
        alert(`Question ${i + 1} is empty`);
        return;
      }
      
      if (!q.options || q.options.some(opt => opt.trim() === '')) {
        alert(`All options for question ${i + 1} must be filled`);
        return;
      }
    }
    
    const fullQuestions: TestQuestion[] = questions.map((q, index) => ({
      id: `custom-${company.id}-${Date.now()}-${index}`,
      language: language,
      difficulty: difficulty,
      question: q.question!,
      code: q.code,
      options: q.options!,
      correctAnswer: q.correctAnswer!,
      createdBy: company.id
    }));
    
    const customTest: CustomTest = {
      id: `test-${Date.now()}`,
      companyId: company.id,
      title,
      description,
      language,
      difficulty,
      questions: fullQuestions,
      invitedCandidates: selectedCandidates
    };
    
    addCustomTest(customTest);
    
    // Reset form
    setTitle('');
    setDescription('');
    setLanguage('');
    setDifficulty('intermediate');
    setQuestions([]);
    setSelectedCandidates([]);
    
    alert('Custom test created successfully!');
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Create Custom Test
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Create a custom test to evaluate candidates for specific skills
        </p>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Test Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Programming Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Language</option>
                {availableLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Test Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as SkillLevel)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Questions</h4>
            {questions.length === 0 ? (
              <div className="text-center py-4 bg-gray-50 rounded-md">
                <p className="text-gray-500">No questions added yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-medium text-gray-700">Question {qIndex + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Question Text
                      </label>
                      <textarea
                        value={q.question || ''}
                        onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                        rows={2}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Code Snippet (Optional)
                      </label>
                      <textarea
                        value={q.code || ''}
                        onChange={(e) => updateQuestion(qIndex, 'code', e.target.value)}
                        rows={3}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md font-mono"
                      />
                    </div>
                    
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      <div className="mt-1 space-y-2">
                        {q.options?.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center">
                            <input
                              type="radio"
                              checked={q.correctAnswer === oIndex}
                              onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                              className="ml-2 flex-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder={`Option ${oIndex + 1}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Select the radio button next to the correct answer.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              Add Question
            </button>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Select Candidates</h4>
            {candidates.length === 0 ? (
              <div className="text-center py-4 bg-gray-50 rounded-md">
                <p className="text-gray-500">No candidates available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {candidates.map((candidate) => (
                  <div 
                    key={candidate.id} 
                    className={`border rounded-md p-3 cursor-pointer ${
                      selectedCandidates.includes(candidate.id) 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleCandidate(candidate.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomTestForm;