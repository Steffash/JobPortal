import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.config';

const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.customData?.email; // Optional chaining in case customData is undefined
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage, email, credential);
        setError(errorMessage);
      });
  };

  const handleEmailLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center'>
        <h2 className='text-2xl font-bold mb-6'>Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleEmailLogin} className='mb-6'>
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
          <div className='mb-6'>
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
          <button
            type='submit'
            className='w-full bg-blue hover:bg-blue text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300'
          >
            Login with Email
          </button>
        </form>
        <div className='text-center mb-4'>
          <p className='text-gray-600'>or</p>
        </div>
        <button
          className='flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300 w-full'
          onClick={handleGoogleLogin}
        >
          <svg className='w-6 h-6 mr-3' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M23.7 12.2c0-.8-.1-1.6-.2-2.3H12v4.4h6.6c-.3 1.4-1 2.5-2 3.3v2.7h3.3c1.9-1.8 3-4.3 3-7.3z' />
            <path d='M12 24c3 0 5.5-1 7.3-2.7l-3.3-2.7c-1 .7-2.2 1.1-4 1.1-3 0-5.4-2-6.3-4.8H2.3v3.1C4 21.1 7.7 24 12 24z' />
            <path d='M5.7 14.3c-.3-1-.3-2-.3-3s.1-2 .3-3V5.8H2.3C1.3 7.8 0.7 9.8 0.7 12s.5 4.2 1.6 6.2l3.4-2.7z' />
            <path d='M12 4.8c1.7 0 3.1.6 4.1 1.8l3.1-3.1C16.5 1.4 14.3 0 12 0 7.7 0 4 2.9 2.3 6.8l3.4 2.7c.9-2.8 3.3-4.8 6.3-4.8z' />
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
