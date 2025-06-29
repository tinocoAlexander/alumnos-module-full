import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const messageSchema = z.object({
  receiverId: z.string().min(1, 'Please select a recipient'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters'),
  content: z
    .string()
    .min(1, 'Message content is required')
    .max(2000, 'Message must be less than 2000 characters'),
});

export const searchSchema = z.object({
  query: z.string().optional(),
  department: z.string().optional(),
  year: z.string().optional(),
  status: z.string().optional(),
});

export const studentSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  studentId: z
    .string()
    .min(1, 'Student ID is required')
    .regex(/^STU\d{3,}$/, 'Student ID must start with STU followed by at least 3 digits'),
  department: z
    .string()
    .min(1, 'Department is required'),
  year: z
    .number()
    .min(1, 'Year must be at least 1')
    .max(6, 'Year cannot exceed 6'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), 'Please enter a valid phone number'),
  address: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Please enter a valid date'),
  gpa: z
    .number()
    .min(0, 'GPA cannot be negative')
    .max(4, 'GPA cannot exceed 4.0')
    .optional(),
  status: z.enum(['active', 'inactive', 'graduated']),
});

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), 'Please enter a valid phone number'),
  address: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Please enter a valid date'),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  if (data.newPassword && data.newPassword.length < 6) {
    return false;
  }
  return true;
}, {
  message: "Password validation failed",
  path: ["newPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;