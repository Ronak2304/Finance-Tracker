import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
  const { authUser, logIn, isLoggingIn } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
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
      logIn({ email, password });
      if (authUser) console.log("Login successful");
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md bg-base-100 text-base-content p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-base-content"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="text-sm">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="link link-primary">Sign Up</a>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn btn-primary w-full"
          >
            {isLoggingIn ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
