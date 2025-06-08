import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Signup = () => {
  const { authUser, signUp, isSigningUp } = useAuthStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!email.trim() || !name.trim() || !password.trim()) {
      toast.error("All fields are required");
      return false;
    }
    if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signUp({
        email,
        fullName: name,
        password,
      });

      if (authUser) {
        console.log("SignUp successful");
      }

      setEmail('');
      setName('');
      setPassword('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md bg-base-100 text-base-content p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="link link-primary">Login</a>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="btn btn-primary w-full"
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
