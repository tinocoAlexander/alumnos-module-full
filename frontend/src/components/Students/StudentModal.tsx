import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Award } from 'lucide-react';
import Modal from '../UI/Modal';
import { Student } from '../../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, student }) => {
  if (!student) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'graduated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Student Profile" size="lg">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start space-x-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-medium text-gray-600">
                {student.firstName[0]}{student.lastName[0]}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-lg text-gray-600">{student.studentId}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(student.status)}`}>
                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black border-b border-gray-200 pb-2">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-black">{student.email}</p>
                </div>
              </div>
              {student.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-black">{student.phone}</p>
                  </div>
                </div>
              )}
              {student.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-black">{student.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black border-b border-gray-200 pb-2">
              Academic Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-black">{student.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="text-black">Year {student.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">GPA</p>
                  <p className="text-black">{student.gpa?.toFixed(2) || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-black border-b border-gray-200 pb-2">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-black">{formatDate(student.dateOfBirth)}</p>
              </div>
            </div>
            {student.enrollmentDate && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Enrollment Date</p>
                  <p className="text-black">{formatDate(student.enrollmentDate)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudentModal;