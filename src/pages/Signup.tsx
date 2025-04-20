import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Signup: React.FC = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      const success = await signup(email, password, name);
      if (success) {
        navigate('/');
      } else {
        setError('Account creation failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-netflix-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="container mx-auto">
          <Link to="/" className="inline-block">
            <svg viewBox="0 0 111 30" className="h-8 fill-netflix-red" aria-hidden="true">
              <path d="M105.06 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.196 0h5.063l3.062 7.874L105.063 0h5.063l-5.063 14.28h-.001zm-48.594 11.845c-1.024-.25-2.187-.5-3.438-.844l-.313 2.969h-4.812l1.938-20.532c2.125-.506 4.844-.844 7.594-.844 2.375 0 4.062.375 5.188 1.157 1.125.75 1.937 2.062 1.937 3.656 0 2.094-1.25 3.75-2.937 4.782-.844.562-1.687.937-2.75 1.187 1.25.25 2.187.688 2.75 1.25.812.688 1.406 1.875 2.406 4l2.376 4.469c-1.25.25-2.875.5-4.375.875l-1.626-3.625c-.937-1.813-1.844-3.563-4.375-3.563H57.5l-.625 6.594zM57.5 17.814h1.25c2.375 0 4.625-1.25 4.625-3.626 0-1.25-.625-2.625-3.125-2.625-.844 0-1.719.063-2.375.157l-.375 6.094zm-15 13.155c-4.375 0-7-1.656-7-5.25 0-3.782 2.782-5.97 7.407-5.97 1.844 0 3.156.252 4.156.502l-.25 3.092c-1.126-.341-2.188-.404-3.407-.404-2.5 0-3.593.907-3.593 2.564 0 1.595 1.187 2.564 3.25 2.564 1.344 0 2.625-.308 3.75-.591l.125 2.904c-1.25.313-2.844.589-4.438.589zm-14.5-14.778c-3.156 0-4.407 2.969-4.407 6.844 0 3.563 1.25 7.094 4.407 7.094 3.125 0 4.375-3.5 4.375-7.094 0-3.75-1.25-6.844-4.375-6.844zm0 17.656c-6.125 0-9.094-4.657-9.094-10.812 0-6.22 2.969-10.782 9.094-10.782 6.157 0 9.094 4.563 9.094 10.782 0 6.155-2.938 10.812-9.094 10.812zM0 29.75h5.063l1.5-15.815h.062L10.5 29.751h3.906l3.813-15.815h.063l1.625 15.814h4.687L20.875 0h-6.125L11.5 15.564h-.063L8.25 0H2.063L0 29.75z" />
            </svg>
          </Link>
        </div>
      </header>
      
      {/* Signup Form */}
      <main className="relative z-10 flex flex-grow items-center justify-center px-4 py-8">
        <div className="w-full max-w-md p-8 bg-black bg-opacity-80 rounded">
          <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>
          
          {error && (
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            
            <Input
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
            
            <Input
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              className="mt-2"
            >
              Sign Up
            </Button>
          </form>
          
          <div className="mt-8 text-gray-400">
            <p>
              Already have an account? {' '}
              <Link to="/login" className="text-white hover:underline">
                Sign in
              </Link>
            </p>
            <p className="mt-4 text-sm">
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;