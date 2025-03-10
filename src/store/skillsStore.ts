import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CustomTest, ProgrammingLanguage, SkillLevel, TestQuestion, TestResult } from '../types';

interface SkillsState {
  availableLanguages: ProgrammingLanguage[];
  testQuestions: Record<ProgrammingLanguage, Record<SkillLevel, TestQuestion[]>>;
  testResults: TestResult[];
  customTests: CustomTest[];
  addTestResult: (result: TestResult) => void;
  addTestQuestion: (question: TestQuestion) => void;
  updateTestQuestion: (question: TestQuestion) => void;
  deleteTestQuestion: (questionId: string) => void;
  addCustomTest: (test: CustomTest) => void;
  updateCustomTest: (test: CustomTest) => void;
  deleteCustomTest: (testId: string) => void;
  inviteCandidateToTest: (testId: string, candidateId: string) => void;
}

// Mock test questions
const createMockQuestions = (): Record<ProgrammingLanguage, Record<SkillLevel, TestQuestion[]>> => {
  const languages: ProgrammingLanguage[] = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 
    'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust', 'HTML/CSS'
  ];
  
  const levels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
  
  const result: Record<ProgrammingLanguage, Record<SkillLevel, TestQuestion[]>> = {} as any;
  
  languages.forEach(language => {
    result[language] = {} as Record<SkillLevel, TestQuestion[]>;
    
    levels.forEach(level => {
      result[language][level] = [];
    });
  });
  
  // JavaScript questions
  result.JavaScript.beginner = [
    {
      id: 'js-beg-1',
      language: 'JavaScript',
      difficulty: 'beginner',
      question: 'What will be the output of: console.log(typeof [])?',
      options: ['array', 'object', 'undefined', 'null'],
      correctAnswer: 1
    },
    {
      id: 'js-beg-2',
      language: 'JavaScript',
      difficulty: 'beginner',
      question: 'Which method is used to add an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correctAnswer: 0
    }
  ];
  
  result.JavaScript.intermediate = [
    {
      id: 'js-int-1',
      language: 'JavaScript',
      difficulty: 'intermediate',
      question: 'What is the output of: console.log(0.1 + 0.2 === 0.3)?',
      options: ['true', 'false', 'undefined', 'error'],
      correctAnswer: 1
    },
    {
      id: 'js-int-2',
      language: 'JavaScript',
      difficulty: 'intermediate',
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that has access to variables in its outer scope',
        'A way to close a browser window',
        'A method to end a loop',
        'A special type of object'
      ],
      correctAnswer: 0
    }
  ];
  
  result.JavaScript.advanced = [
    {
      id: 'js-adv-1',
      language: 'JavaScript',
      difficulty: 'advanced',
      question: 'What is the output of the following code?\n\nconst obj = {\n  a: 1,\n  b: 2,\n  c: 3\n};\n\nconst { a, ...rest } = obj;\nconsole.log(rest);',
      options: [
        '{ b: 2, c: 3 }',
        '{ a: 1 }',
        '[b, c]',
        'Error'
      ],
      correctAnswer: 0
    }
  ];
  
  result.JavaScript.expert = [
    {
      id: 'js-exp-1',
      language: 'JavaScript',
      difficulty: 'expert',
      question: 'What is the output of the following code?\n\nconst promise1 = Promise.resolve(1);\nconst promise2 = Promise.reject(2);\nconst promise3 = Promise.resolve(3);\n\nPromise.allSettled([promise1, promise2, promise3])\n  .then(results => console.log(results.map(r => r.status)));',
      options: [
        '["fulfilled", "rejected", "fulfilled"]',
        '["resolved", "rejected", "resolved"]',
        'Error: Promise.allSettled is not a function',
        '[1, Error, 3]'
      ],
      correctAnswer: 0
    }
  ];
  
  // TypeScript questions
  result.TypeScript.beginner = [
    {
      id: 'ts-beg-1',
      language: 'TypeScript',
      difficulty: 'beginner',
      question: 'Which of the following is a valid TypeScript type?',
      options: ['string', 'String', 'str', 'text'],
      correctAnswer: 0
    }
  ];
  
  result.TypeScript.intermediate = [
    {
      id: 'ts-int-1',
      language: 'TypeScript',
      difficulty: 'intermediate',
      question: 'What does the "readonly" modifier do in TypeScript?',
      options: [
        'Makes a property only readable during runtime',
        'Prevents reassignment of a property after initialization',
        'Makes a class unable to be extended',
        'Prevents a method from being overridden'
      ],
      correctAnswer: 1
    }
  ];
  
  // Python questions
  result.Python.beginner = [
    {
      id: 'py-beg-1',
      language: 'Python',
      difficulty: 'beginner',
      question: 'What is the correct way to create a function in Python?',
      options: [
        'function myFunc():',
        'def myFunc():',
        'create myFunc():',
        'func myFunc():'
      ],
      correctAnswer: 1
    }
  ];
  
  // Add at least one question for each language at beginner level
  result.Java.beginner = [
    {
      id: 'java-beg-1',
      language: 'Java',
      difficulty: 'beginner',
      question: 'Which keyword is used to inherit a class in Java?',
      options: ['extends', 'implements', 'inherits', 'using'],
      correctAnswer: 0
    }
  ];
  
  result['C#'].beginner = [
    {
      id: 'csharp-beg-1',
      language: 'C#',
      difficulty: 'beginner',
      question: 'What is the correct way to declare a constant in C#?',
      options: [
        'constant int MAX_VALUE = 100;',
        'const int MAX_VALUE = 100;',
        'final int MAX_VALUE = 100;',
        'static readonly int MAX_VALUE = 100;'
      ],
      correctAnswer: 1
    }
  ];
  
  result.PHP.beginner = [
    {
      id: 'php-beg-1',
      language: 'PHP',
      difficulty: 'beginner',
      question: 'How do you start a PHP block of code?',
      options: ['<php>', '<?php', '<script php>', '<?'],
      correctAnswer: 1
    }
  ];
  
  result.Ruby.beginner = [
    {
      id: 'ruby-beg-1',
      language: 'Ruby',
      difficulty: 'beginner',
      question: 'What symbol is used for string interpolation in Ruby?',
      options: ['${}', '#{}', '@{}', '&{}'],
      correctAnswer: 1
    }
  ];
  
  result.Go.beginner = [
    {
      id: 'go-beg-1',
      language: 'Go',
      difficulty: 'beginner',
      question: 'What is the keyword to declare a variable in Go?',
      options: ['var', 'let', 'dim', 'variable'],
      correctAnswer: 0
    }
  ];
  
  result.Swift.beginner = [
    {
      id: 'swift-beg-1',
      language: 'Swift',
      difficulty: 'beginner',
      question: 'Which keyword is used to declare a constant in Swift?',
      options: ['const', 'let', 'constant', 'final'],
      correctAnswer: 1
    }
  ];
  
  result.Kotlin.beginner = [
    {
      id: 'kotlin-beg-1',
      language: 'Kotlin',
      difficulty: 'beginner',
      question: 'What is the correct way to declare a variable in Kotlin?',
      options: ['var name: String', 'String name;', 'dim name as String', 'let name: String'],
      correctAnswer: 0
    }
  ];
  
  result.Rust.beginner = [
    {
      id: 'rust-beg-1',
      language: 'Rust',
      difficulty: 'beginner',
      question: 'What keyword is used to declare a variable in Rust?',
      options: ['var', 'let', 'dim', 'variable'],
      correctAnswer: 1
    }
  ];
  
  result['HTML/CSS'].beginner = [
    {
      id: 'html-beg-1',
      language: 'HTML/CSS',
      difficulty: 'beginner',
      question: 'Which HTML tag is used to define an unordered list?',
      options: ['<ol>', '<ul>', '<li>', '<list>'],
      correctAnswer: 1
    }
  ];
  
  return result;
};

export const useSkillsStore = create<SkillsState>()(
  persist(
    (set) => ({
      availableLanguages: [
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
      ],
      testQuestions: createMockQuestions(),
      testResults: [],
      customTests: [],
      addTestResult: (result) => set((state) => ({
        testResults: [...state.testResults, result]
      })),
      addTestQuestion: (question) => set((state) => {
        const updatedQuestions = { ...state.testQuestions };
        updatedQuestions[question.language][question.difficulty] = [
          ...updatedQuestions[question.language][question.difficulty],
          question
        ];
        return { testQuestions: updatedQuestions };
      }),
      updateTestQuestion: (question) => set((state) => {
        const updatedQuestions = { ...state.testQuestions };
        updatedQuestions[question.language][question.difficulty] = updatedQuestions[question.language][question.difficulty].map(
          q => q.id === question.id ? question : q
        );
        return { testQuestions: updatedQuestions };
      }),
      deleteTestQuestion: (questionId) => set((state) => {
        const updatedQuestions = { ...state.testQuestions };
        
        // Find and remove the question
        for (const language of Object.keys(updatedQuestions) as ProgrammingLanguage[]) {
          for (const level of Object.keys(updatedQuestions[language]) as SkillLevel[]) {
            updatedQuestions[language][level] = updatedQuestions[language][level].filter(
              q => q.id !== questionId
            );
          }
        }
        
        return { testQuestions: updatedQuestions };
      }),
      addCustomTest: (test) => set((state) => ({
        customTests: [...state.customTests, test]
      })),
      updateCustomTest: (test) => set((state) => ({
        customTests: state.customTests.map(t => t.id === test.id ? test : t)
      })),
      deleteCustomTest: (testId) => set((state) => ({
        customTests: state.customTests.filter(t => t.id !== testId)
      })),
      inviteCandidateToTest: (testId, candidateId) => set((state) => ({
        customTests: state.customTests.map(test => {
          if (test.id === testId && !test.invitedCandidates.includes(candidateId)) {
            return {
              ...test,
              invitedCandidates: [...test.invitedCandidates, candidateId]
            };
          }
          return test;
        })
      }))
    }),
    {
      name: 'skills-storage'
    }
  )
);