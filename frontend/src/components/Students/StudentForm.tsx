import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { Student, StudentFormData } from '../../types';
import { studentSchema } from '../../utils/validation';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
  student?: Student | null;
  loading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  loading = false,
}) => {
  const isEditing = !!student;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: student ? {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
      year: student.year,
      phone: student.phone || '',
      address: student.address || '',
      dateOfBirth: student.dateOfBirth || '',
      gpa: student.gpa || 0,
      status: student.status,
    } : {
      firstName: '',
      lastName: '',
      email: '',
      studentId: '',
      department: '',
      year: 1,
      phone: '',
      address: '',
      dateOfBirth: '',
      gpa: 0,
      status: 'active' as const,
    },
  });

  const departments = [
    'Computer Science',
    'Engineering',
    'Business',
    'Psychology',
    'Medicine',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Literature',
  ];

  const handleFormSubmit = async (data: StudentFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Student' : 'Add New Student'}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
            required
          />
          <Input
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            required
          />
          <Input
            label="Student ID"
            {...register('studentId')}
            error={errors.studentId?.message}
            placeholder="STU001"
            required
          />
        </div>

        {/* Academic Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              {...register('department')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
            )}
          </div>
          
          <Input
            label="Year"
            type="number"
            min="1"
            max="6"
            {...register('year', { valueAsNumber: true })}
            error={errors.year?.message}
            required
          />
          
          <Input
            label="GPA"
            type="number"
            step="0.01"
            min="0"
            max="4"
            {...register('gpa', { valueAsNumber: true })}
            error={errors.gpa?.message}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Date of Birth"
            type="date"
            {...register('dateOfBirth')}
            error={errors.dateOfBirth?.message}
          />
        </div>

        <Input
          label="Address"
          {...register('address')}
          error={errors.address?.message}
          placeholder="123 Main St, City, State 12345"
        />

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting || loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting || loading}
          >
            {isEditing ? 'Update Student' : 'Add Student'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentForm;