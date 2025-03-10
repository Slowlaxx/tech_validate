import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { Candidate, ProgrammingLanguage, SkillLevel } from '../../types';
import { Clock } from 'lucide-react';

const SkillTest: React.FC = () => {
  const { language, level } = useParams<{ language: string; level: string }>();
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const { testQuestions, addTestResult } = useSkillsStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState<Date>(new Date());
  const [isStarted, setIsStarted] = useState(false);
  
  const candidate = user as Candidate;
  
  if (!language || !level || !testQuestions[language as ProgrammingLanguage]?.[level as SkillLevel]) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Invalid Test
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-center">
          <p className="text-gray-500">The requested test is not available.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/skills')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Skills
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const questions = testQuestions[language as ProgrammingLanguage][level as SkillLevel];
  
  // Calculate total estimated time
  const totalTime = questions.reduce((total, q) => total + (q.estimatedTime || 120), 0);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  
  useEffect(() => {
    if (!isStarted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isStarted]);
  
  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishTest();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const finishTest = () => {
    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    const isPassed = finalScore >= 70;
    
    setScore(finalScore);
    setTestCompleted(true);
    
    // Update user's skill
    const updatedSkills = candidate.skills.map(skill => 
      skill.language === language && skill.level === level
        ? { ...skill, isValidated: isPassed, score: finalScore }
        : skill
    );
    
    updateUser({ skills: updatedSkills });
    
    // Add test result with timing information
    addTestResult({
      candidateId: candidate.id,
      language: language as ProgrammingLanguage,
      level: level as SkillLevel,
      score: finalScore,
      isPassed,
      date: new Date(),
      startTime,
      endTime,
      timeSpent
    });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!isStarted) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Start Test: {language} ({level})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {questions.length} questions • Estimated time: {Math.round(totalTime / 60)} minutes
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              Once you start the test, you'll have {Math.round(totalTime / 60)} minutes to complete it.
              The test will automatically submit when the time is up.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Make sure you have a stable internet connection and won't be interrupted.
            </p>
            <button
              onClick={() => setIsStarted(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (testCompleted) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Test Results: {language} ({level})
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="text-center">
            <div className="text-3xl font-bold">
              Your Score: {score}%
            </div>
            <div className="mt-2 text-lg">
              {score >= 70 ? (
                <div className="text-green-600">
                  Congratulations! You passed the test.
                </div>
              ) : (
                <div className="text-red-600">
                  You did not pass the test. You need 70% to pass.
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/skills')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {language} Skill Test ({level})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="text-sm font-medium text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Time Remaining: <span className={timeLeft < 60 ? 'text-red-600 ml-1' : 'ml-1'}>{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {currentQuestion.question}
          </h4>
          {currentQuestion.code && (
            <div className="mb-6">
              <div className="bg-gray-800 rounded-t-md px-4 py-2 text-xs font-mono text-gray-200">
                Code Example
              </div>
              <pre className="bg-gray-900 p-4 rounded-b-md overflow-x-auto">
                <code className="text-sm font-mono text-gray-200 whitespace-pre-wrap">
                  {currentQuestion.code}
                </code>
              </pre>
            </div>
          )}
          <div className="space-y-4 mt-6">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`relative flex items-start p-4 cursor-pointer rounded-lg border ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleSelectAnswer(index)}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    <span className="mr-2 inline-flex items-center justify-center h-5 w-5 rounded bg-gray-200 text-xs font-medium text-gray-800">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </div>
                <div className="ml-3 flex items-center h-5">
                  <input
                    type="radio"
                    checked={selectedAnswers[currentQuestionIndex] === index}
                    onChange={() => handleSelectAnswer(index)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentQuestionIndex === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Test'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillTest;