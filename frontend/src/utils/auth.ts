import Cookies from 'js-cookie';
import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const setUserData = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserData = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Mock authentication functions
export const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'student@university.edu' && password === 'password123') {
    const user: User = {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      studentId: 'STU001',
      department: 'Computer Science',
      year: 3
    };
    
    const token = 'mock_jwt_token_' + Date.now();
    setAuthToken(token);
    setUserData(user);
    
    return user;
  }
  
  throw new Error('Invalid credentials');
};

export const mockGoogleLogin = async (): Promise<User> => {
  // Simulate Google OAuth flow
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const user: User = {
    id: '2',
    email: 'google.user@university.edu',
    firstName: 'Jane',
    lastName: 'Smith',
    studentId: 'STU002',
    department: 'Engineering',
    year: 2
  };
  
  const token = 'mock_google_jwt_token_' + Date.now();
  setAuthToken(token);
  setUserData(user);
  
  return user;
};