import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setError("");

    // Login api call 

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);

        if (role === "admin") {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to Log In
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="souf@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type="submit" className="btn-primary">
            Log In
          </button>
          <p className="text-[13px] text-slate-900">
            Don't have an account?{" "}
            <Link className="text-blue-800 font-medium underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
 