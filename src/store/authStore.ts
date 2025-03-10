import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Admin, Candidate, Company, User, UserRole } from '../types';

interface AuthState {
  user: (Candidate | Company | Admin) | null;
  isAuthenticated: boolean;
  login: (user: Candidate | Company | Admin) => void;
  logout: () => void;
  updateUser: (userData: Partial<Candidate | Company | Admin>) => void;
}

// Mock data for initial development
const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    email: 'john@example.com',
    password: 'password123',
    role: 'candidate',
    name: 'John Doe',
    bio: 'Full-stack developer with 3 years of experience',
    location: 'New York, USA',
    skills: [
      { language: 'JavaScript', level: 'advanced', isValidated: true, score: 85 },
      { language: 'Python', level: 'intermediate', isValidated: false }
    ],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const mockCompanies: Company[] = [
  {
    id: 'comp1',
    email: 'hr@techcorp.com',
    password: 'company123',
    role: 'company',
    name: 'TechCorp',
    description: 'Leading software development company',
    industry: 'Software Development',
    location: 'San Francisco, USA',
    website: 'https://techcorp.example.com',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    customTests: []
  }
];

const mockAdmins: Admin[] = [
  {
    id: 'admin1',
    email: 'admin@techvalidate.com',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator'
  }
];

// Combine mock data
export const mockUsers = [...mockCandidates, ...mockCompanies, ...mockAdmins];

// Find user by email and password
export const findUser = (email: string, password: string): (Candidate | Company | Admin) | undefined => {
  return mockUsers.find(user => user.email === email && user.password === password);
};

// Get all candidates
export const getAllCandidates = (): Candidate[] => {
  return mockUsers.filter(user => user.role === 'candidate') as Candidate[];
};

// Get all companies
export const getAllCompanies = (): Company[] => {
  return mockUsers.filter(user => user.role === 'company') as Company[];
};

// Create a new user
export const createUser = (userData: Omit<Candidate | Company | Admin, 'id'>) => {
  const newUser = {
    ...userData,
    id: `user${mockUsers.length + 1}`
  } as Candidate | Company | Admin;
  
  mockUsers.push(newUser);
  return newUser;
};

// Update user data
export const updateUserData = (id: string, userData: Partial<Candidate | Company | Admin>) => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
    return mockUsers[userIndex];
  }
  return null;
};

// Auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (userData) => set((state) => {
        if (!state.user) return state;
        return {
          user: { ...state.user, ...userData },
          isAuthenticated: true
        };
      })
    }),
    {
      name: 'auth-storage'
    }
  )
);