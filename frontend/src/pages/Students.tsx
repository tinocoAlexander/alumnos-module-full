import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Mail, Phone, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import StudentModal from '../components/Students/StudentModal';
import StudentForm from '../components/Students/StudentForm';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import { Student, StudentFormData } from '../types';

const Students: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const studentsPerPage = 12;

  // Mock student data with enhanced fields
  const [mockStudents, setMockStudents] = useState<Student[]>([
    {
      id: '1',
      studentId: 'STU001',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@university.edu',
      department: 'Computer Science',
      year: 3,
      gpa: 3.8,
      status: 'active',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Springfield, IL 62701',
      dateOfBirth: '2001-05-15',
      enrollmentDate: '2021-09-01',
    },
    {
      id: '2',
      studentId: 'STU002',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob.smith@university.edu',
      department: 'Engineering',
      year: 2,
      gpa: 3.6,
      status: 'active',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Springfield, IL 62702',
      dateOfBirth: '2002-08-22',
      enrollmentDate: '2022-09-01',
    },
    {
      id: '3',
      studentId: 'STU003',
      firstName: 'Carol',
      lastName: 'Williams',
      email: 'carol.williams@university.edu',
      department: 'Business',
      year: 4,
      gpa: 3.9,
      status: 'active',
      phone: '+1 (555) 345-6789',
      address: '789 Pine St, Springfield, IL 62703',
      dateOfBirth: '2000-12-10',
      enrollmentDate: '2020-09-01',
    },
    {
      id: '4',
      studentId: 'STU004',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@university.edu',
      department: 'Computer Science',
      year: 1,
      gpa: 3.7,
      status: 'active',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Springfield, IL 62704',
      dateOfBirth: '2003-03-18',
      enrollmentDate: '2023-09-01',
    },
    {
      id: '5',
      studentId: 'STU005',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@university.edu',
      department: 'Psychology',
      year: 3,
      gpa: 3.5,
      status: 'active',
      phone: '+1 (555) 567-8901',
      address: '654 Maple Ave, Springfield, IL 62705',
      dateOfBirth: '2001-11-25',
      enrollmentDate: '2021-09-01',
    },
    {
      id: '6',
      studentId: 'STU006',
      firstName: 'Frank',
      lastName: 'Miller',
      email: 'frank.miller@university.edu',
      department: 'Engineering',
      year: 4,
      gpa: 3.4,
      status: 'graduated',
      phone: '+1 (555) 678-9012',
      address: '987 Cedar St, Springfield, IL 62706',
      dateOfBirth: '2000-07-08',
      enrollmentDate: '2020-09-01',
    },
  ]);

  const departments = ['Computer Science', 'Engineering', 'Business', 'Psychology', 'Medicine'];
  const years = ['1', '2', '3', '4'];
  const statuses = ['active', 'inactive', 'graduated'];

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment = !filters.department || student.department === filters.department;
      const matchesYear = !filters.year || student.year.toString() === filters.year;
      const matchesStatus = !filters.status || student.status === filters.status;

      return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
    });
  }, [searchQuery, filters, mockStudents]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ department: '', year: '', status: '' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowStudentForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const handleStudentSubmit = async (data: StudentFormData) => {
    setFormLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingStudent) {
        // Update existing student
        setMockStudents(prev => prev.map(student => 
          student.id === editingStudent.id 
            ? { ...student, ...data }
            : student
        ));
      } else {
        // Add new student
        const newStudent: Student = {
          id: Date.now().toString(),
          ...data,
          enrollmentDate: new Date().toISOString().split('T')[0],
        };
        setMockStudents(prev => [newStudent, ...prev]);
      }
    } catch (error) {
      console.error('Student operation failed:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    setDeleteLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMockStudents(prev => prev.filter(student => student.id !== studentToDelete.id));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

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

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Student Directory</h1>
            <p className="mt-2 text-gray-600">
              Search and manage student records
            </p>
          </div>
          <Button onClick={handleAddStudent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredStudents.length} students found
                </span>
                <Button variant="ghost" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Year
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        Year {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedStudents.map((student) => (
            <Card key={student.id} hover>
              <div className="space-y-4">
                {/* Student Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {student.firstName[0]}{student.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{student.studentId}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </div>

                {/* Student Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{student.department}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Year {student.year}</span>
                    <span className="font-medium text-black">GPA: {student.gpa}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProfile(student)}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditStudent(student)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteStudent(student)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'outline'}
                onClick={() => setCurrentPage(page)}
                size="sm"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Student Profile Modal */}
      <StudentModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        student={selectedStudent}
      />

      {/* Student Form Modal */}
      <StudentForm
        isOpen={showStudentForm}
        onClose={() => setShowStudentForm(false)}
        onSubmit={handleStudentSubmit}
        student={editingStudent}
        loading={formLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete?.firstName} ${studentToDelete?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </Layout>
  );
};

export default Students;