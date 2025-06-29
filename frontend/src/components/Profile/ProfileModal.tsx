import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Eye, EyeOff } from 'lucide-react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import ConfirmDialog from '../UI/ConfirmDialog';
import { User, ProfileFormData } from '../../types';
import { profileSchema } from '../../utils/validation';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  user: User;
  loading?: boolean;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  loading = false,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<ProfileFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const handleFormSubmit = async (data: ProfileFormData) => {
    // Remove password fields if not changing password
    if (!changePassword) {
      delete data.currentPassword;
      delete data.newPassword;
      delete data.confirmPassword;
    }
    
    setPendingData(data);
    setShowSaveConfirm(true);
  };

  const confirmSave = async () => {
    if (!pendingData) return;
    
    try {
      await onSubmit(pendingData);
      reset();
      setChangePassword(false);
      setShowSaveConfirm(false);
      setPendingData(null);
      onClose();
    } catch (error) {
      console.error('Profile update error:', error);
      setShowSaveConfirm(false);
      setPendingData(null);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      // Could add unsaved changes warning here
    }
    reset();
    setChangePassword(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Edit Profile"
        size="lg"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-medium text-gray-600">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black">Profile Picture</h3>
              <p className="text-sm text-gray-500">Click the camera icon to upload a new photo</p>
            </div>
          </div>

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

          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            required
          />

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

          {/* Password Change Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-black">Change Password</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setChangePassword(!changePassword)}
              >
                {changePassword ? 'Cancel' : 'Change Password'}
              </Button>
            </div>

            {changePassword && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    {...register('currentPassword')}
                    error={errors.currentPassword?.message}
                    required={changePassword}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    {...register('newPassword')}
                    error={errors.newPassword?.message}
                    required={changePassword}
                    helpText="Password must be at least 6 characters long"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    required={changePassword}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {newPassword && newPassword !== watch('confirmPassword') && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
              </div>
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
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Save Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showSaveConfirm}
        onClose={() => {
          setShowSaveConfirm(false);
          setPendingData(null);
        }}
        onConfirm={confirmSave}
        title="Save Profile Changes"
        message="Are you sure you want to save these changes to your profile?"
        confirmText="Save Changes"
        cancelText="Cancel"
        variant="info"
        loading={loading}
      />
    </>
  );
};

export default ProfileModal;