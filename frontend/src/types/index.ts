export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  studentId: string;
  department: string;
  year: number;
  avatar?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gpa?: number;
  status?: 'active' | 'inactive' | 'graduated';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  parentId?: string;
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  year: number;
  gpa: number;
  status: 'active' | 'inactive' | 'graduated';
  avatar?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface SearchFilters {
  department: string;
  year: string;
  status: string;
  query: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  year: number;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gpa?: number;
  status: 'active' | 'inactive' | 'graduated';
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}