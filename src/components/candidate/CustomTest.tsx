import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSkillsStore } from '../../store/skillsStore';
import { getAllCompanies } from '../../store/authStore';
import { Candidate, CustomTest as CustomTestType } from '../../types';
import { Building2 } from 'lucide-react';

const CustomTest: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { customTests, addTestResult } = useSkillsStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [startTime] = useState<Date>(new Date());
  const [isStarted, setIsStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const candidate = user as Candidate;
  const companies = getAllCompanies();
  
  const test = customTests.find(t => t.id === testId);
  
  // Calculate total time from test configuration
  const totalTime = test?.estimatedDuration || 300; // Default 5 minutes if not set
  const [timeLeft, setTimeLeft] = useState(totalTime);
  
  if (!test || !test.invitedCandidates.includes(candidate.id)) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Test Not Available
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-center">
          <p className="text-gray-500">This test doesn't exist or you haven't been invited to take it.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/company-tests')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const company = companies.find(c => c.id === test.companyId);
  const questions = test.questions;
  
  if (questions.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            No Questions Available
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-center">
          <p className="text-gray-500">There are no questions available for this test.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/company-tests')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
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
  }, []);
  
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
    
    // Add test result with timing information
    addTestResult({
      candidateId: candidate.id,
      language: test.language,
      level: test.difficulty,
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
  
  if (!isStarted && !testCompleted) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Start Test: {test.title}
          </h3>
          {company && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500 flex items-center">
              <Building2 className="h-4 w-4 mr-1 text-gray-400" />
              {company.name}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
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
            Test Results: {test.title}
          </h3>
          {company && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500 flex items-center">
              <Building2 className="h-4 w-4 mr-1 text-gray-400" />
              {company.name}
            </p>
          )}
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
                onClick={() => navigate('/company-tests')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {test.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 flex items-center">
            {company && (
              <>
                <Building2 className="h-4 w-4 mr-1 text-gray-400" />
                {company.name} • 
              </>
            )}
            <span className="ml-1">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </p>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Time Remaining: <span className={timeLeft < 60 ? 'text-red-600' : ''}>{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {currentQuestion.question}
          </h4>
          {currentQuestion.code && (
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm mb-4">
              <code>{currentQuestion.code}</code>
            </pre>
          )}
          <div className="space-y-3 mt-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`option-${index}`}
                    type="radio"
                    name="answer"
                    checked={selectedAnswers[currentQuestionIndex] === index}
                    onChange={() => handleSelectAnswer(index)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`option-${index}`} className="font-medium text-gray-700">
                    {option}
                  </label>
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

export default CustomTest;