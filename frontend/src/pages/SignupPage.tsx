import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { signUpUser } from '../redux/authActions';

const SignupPage: React.FC = () => {
  return (
    <main className="app space-y-12 px-1 md:px-0">
      <h1 className="head-text mt-40">
        <span className="purple-gradient">Create</span> Your{" "}
        <span className="blue-gradient">Account</span>
      </h1>
      <div className="w-full max-w-md mx-auto">
        <SignupForm />
      </div>
    </main>
  );
}

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if(username === '' || email === '' || password === '') {
        setError('All fields are required');
        return;
      }
      if(password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      if(password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      await dispatch(signUpUser({ name: username, email, password }) as any);
      navigate('/login');
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        type="text"
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">
        Sign Up
        <ArrowRight size={20} className="ml-2" />
      </Button>
      <div className="text-center">
        <Link to="/login" className="text-sm text-blue-500 hover:underline">
          Already have an account? Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignupPage;
