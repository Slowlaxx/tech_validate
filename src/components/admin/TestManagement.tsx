import React, { useState } from 'react';
import { useSkillsStore } from '../../store/skillsStore';
import { ProgrammingLanguage, SkillLevel, TestQuestion } from '../../types';
import { PlusCircle, Trash2, Edit, Save, X } from 'lucide-react';

const TestManagement: React.FC = () => {
  const { 
    availableLanguages, 
    testQuestions, 
    addTestQuestion, 
    updateTestQuestion, 
    deleteTestQuestion 
  } = useSkillsStore();
  
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | ''>('');
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('beginner');
  const [editingQuestion, setEditingQuestion] = useState<Partial<TestQuestion> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddQuestion = () => {
    setEditingQuestion({
      language: selectedLanguage as ProgrammingLanguage,
      difficulty: selectedLevel,
      question: '',
      code: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      estimatedTime: 120 // Default 2 minutes per question
    });
    setIsAdding(true);
  };
  
  const handleEditQuestion = (question: TestQuestion) => {
    setEditingQuestion({ ...question });
    setIsAdding(false);
  };
  
  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteTestQuestion(questionId);
    }
  };
  
  const handleSaveQuestion = () => {
    if (!editingQuestion || !selectedLanguage) return;
    
    // Validate question
    if (!editingQuestion.question || editingQuestion.question.trim() === '') {
      alert('Question text is required');
      return;
    }
    
    if (!editingQuestion.options || editingQuestion.options.some(opt => opt.trim() === '')) {
      alert('All options must be filled');
      return;
    }
    
    if (isAdding) {
      // Add new question
      addTestQuestion({
        id: `q-${Date.now()}`,
        language: selectedLanguage as ProgrammingLanguage,
        difficulty: selectedLevel,
        question: editingQuestion.question,
        code: editingQuestion.code,
        options: editingQuestion.options,
        correctAnswer: editingQuestion.correctAnswer || 0,
        createdBy: 'admin',
        estimatedTime: editingQuestion.estimatedTime || 120
      });
    } else {
      // Update existing question
      updateTestQuestion(editingQuestion as TestQuestion);
    }
    
    setEditingQuestion(null);
  };
  
  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };
  
  const handleUpdateOption = (index: number, value: string) => {
    if (!editingQuestion) return;
    
    const newOptions = [...editingQuestion.options!];
    newOptions[index] = value;
    
    setEditingQuestion({
      ...editingQuestion,
      options: newOptions
    });
  };
  
  const filteredQuestions = selectedLanguage 
    ? testQuestions[selectedLanguage as ProgrammingLanguage][selectedLevel] 
    : [];
  
  return (
    <div className="space-y-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Test Questions
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage questions for skill validation tests
          </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Programming Language
              </label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as ProgrammingLanguage | '')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Language</option>
                {availableLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                id="level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as SkillLevel)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
          
          {selectedLanguage && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddQuestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Question
              </button>
            </div>
          )}
        </div>
      </div>
      
      {editingQuestion && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isAdding ? 'Add New Question' : 'Edit Question'}
            </h3>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                  Question Text
                </label>
                <textarea
                  id="question"
                  rows={3}
                  value={editingQuestion.question || ''}
                  onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the question text"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Code Snippet (Optional)
                </label>
                <textarea
                  id="code"
                  rows={5}
                  value={editingQuestion.code || ''}
                  onChange={(e) => setEditingQuestion({...editingQuestion, code: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                  placeholder="Enter code snippet if needed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Answer Options
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Select the radio button next to the correct answer.
                </p>
                <div className="mt-2 space-y-3">
                  {editingQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="correctAnswer"
                        checked={editingQuestion.correctAnswer === index}
                        onChange={() => setEditingQuestion({...editingQuestion, correctAnswer: index})}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleUpdateOption(index, e.target.value)}
                        className="ml-2 flex-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder={`Option ${index + 1}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">
                  Estimated Time (seconds)
                </label>
                <input
                  type="number"
                  id="estimatedTime"
                  min="30"
                  value={editingQuestion.estimatedTime || 120}
                  onChange={(e) => setEditingQuestion({
                    ...editingQuestion,
                    estimatedTime: Math.max(30, parseInt(e.target.value))
                  })}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Minimum time is 30 seconds per question
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <X className="h-5 w-5 mr-1" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveQuestion}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Save className="h-5 w-5 mr-1" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedLanguage && filteredQuestions.length > 0 && !editingQuestion && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {selectedLanguage} - {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Questions
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {filteredQuestions.length} questions available
            </p>
          </div>
          
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {filteredQuestions.map((question) => (
                <li key={question.id} className="px-4 py-4 sm:px-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{question.question}</h4>
                      {question.code && (
                        <pre className="mt-2 bg-gray-50 p-3 rounded-md overflow-x-auto text-sm">
                          <code>{question.code}</code>
                        </pre>
                      )}
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-center">
                            <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full ${
                              question.correctAnswer === index 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            } text-xs font-medium mr-2`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className={question.correctAnswer === index ? 'font-medium' : ''}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {selectedLanguage && filteredQuestions.length === 0 && !editingQuestion && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-center">
            <p className="text-gray-500">No questions available for {selectedLanguage} at {selectedLevel} level.</p>
            <p className="mt-2 text-sm text-gray-500">
              Click "Add Question" to create the first question.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestManagement;