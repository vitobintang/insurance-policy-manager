import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-sm rounded-xl border border-blue-100 p-8">
        <div>
          <h2 className="text-2xl font-semibold text-blue-900 text-center">
            Insurance Policy Manager
          </h2>
          <p className="mt-3 text-center text-sm text-slate-500">
            Sign in or create an account to manage policies
          </p>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'signin')}
              disabled={loading}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'signup')}
              disabled={loading}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;