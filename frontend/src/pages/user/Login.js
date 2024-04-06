// src/pages/Login.js

import React, { useState } from 'react';
import useLogin from '../../hooks/user/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div class="login-form flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="border border-gray-300 p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold md:text-2xl">
                Se connecter à la plateform
            </h1>
            {error && <div className="error">{error}</div>}
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label for="email" class="block mb-2 text-sm">Your email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5" 
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5" 
                        required
                    />
                </div>
                <button type="submit" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Se connecter</button>
            </form>
        </div>
    </div>
  );
}

export default Login;
