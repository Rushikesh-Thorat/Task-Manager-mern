import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import ProfilephotoSelector from '../../components/Inputs/ProfilephotoSelector';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!fullName) {
      setError('Please enter a full name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    if(!password){
      setError('Please enter a password.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
  
  
    setError("");
  
  };
  

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className=" text-xs text-slate-700 mt-[5px] mb-6">
          Join us tody by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilephotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="Full name"
            type="text"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="souf@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          <Input
            value={adminInviteToken}
            onChange={(e) => setAdminInviteToken(e.target.value)}
            label="Admin Invite Token"
            placeholder="6 Digit Code"
            type="text"
          />

      </div>

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
       <button type="submit" className="btn-primary">
        SIGN UP
       </button>

       <p className="text-[13px] text-slate-900">
        Already an account?{" "}
        <Link className="text-blue-800 font-medium underline" to="/login">
        Login 
        </Link>
       </p>

        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
