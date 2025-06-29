import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { loginSchema, LoginFormData } from '../utils/validation';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';

const Login: React.FC = () => {
  const { user, login, loginWithGoogle, loading } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [captchaCompleted, setCaptchaCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  if (user) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    if (!captchaCompleted) {
      setLoginError('Please complete the verification');
      return;
    }

    try {
      setLoginError('');
      await login(data.email, data.password);
    } catch (error) {
      setLoginError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      await loginWithGoogle();
    } catch (error) {
      setLoginError('Google login failed. Please try again.');
    }
  };

  const toggleCaptcha = () => {
    setCaptchaCompleted(!captchaCompleted);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="h-12 w-12 text-black" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-black">
          Sign in to UniManage
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Student Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="student@university.edu"
              {...register('email')}
              error={errors.email?.message}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                error={errors.password?.message}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Mock CAPTCHA */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="captcha"
                  checked={captchaCompleted}
                  onChange={toggleCaptcha}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="captcha" className="text-sm text-gray-700">
                  I'm not a robot
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting || loading}
              disabled={!captchaCompleted}
            >
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              loading={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: student@university.edu / password123
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;