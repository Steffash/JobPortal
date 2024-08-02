import React, { useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config';

const Signup = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log('User info:', user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('Error message:', errorMessage);
      });
  };

  const handleEmailSignup = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User info:', user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('Error message:', errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-10 rounded-xl shadow-lg max-w-md w-full'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Create an Account</h1>
        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}
        <form onSubmit={handleEmailSignup} className='mb-6'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue hover:bg-blue text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300'
          >
            Sign Up
          </button>
        </form>
        <div className='text-center mb-4'>
          <p className='text-gray-600'>or</p>
        </div>
        <button
          className='flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300 w-full'
          onClick={handleGoogleSignup}
        >
          <svg className='w-6 h-6 mr-3' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M23.7 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.6c-.3 1.4-1 2.5-2 3.3v2.7h3.3c1.9-1.8 3-4.3 3-7.3z' />
            <path d='M12 24c3 0 5.5-1 7.3-2.7l-3.3-2.7c-1 .7-2.2 1.1-4 1.1-3 0-5.4-2-6.3-4.8H2.3v3.1C4 21.1 7.7 24 12 24z' />
            <path d='M5.7 14.3c-.3-1-.3-2-.3-3s.1-2 .3-3V5.8H2.3C1.3 7.8 0.7 9.8 0.7 12s.5 4.2 1.6 6.2l3.4-2.7z' />
            <path d='M12 4.8c1.7 0 3.1.6 4.1 1.8l3.1-3.1C16.5 1.4 14.3 0 12 0 7.7 0 4 2.9 2.3 6.8l3.4 2.7c.9-2.8 3.3-4.8 6.3-4.8z' />
          </svg>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
