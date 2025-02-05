import React, { useState, useEffect } from 'react';
import PolicyForm from './components/PolicyForm';
import PolicyList from './components/PolicyList';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [session, setSession] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchPolicies();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchPolicies();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPolicies = async () => {
    try {
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPolicies(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generatePolicyNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(2, 10).replace(/-/g, '');
    const sequence = (policies.length + 1).toString().padStart(4, '0');
    return `POL${dateStr}${sequence}`;
  };

  const handleSavePolicy = async (policyData) => {
    try {
      if (editingPolicy) {
        const { error } = await supabase
          .from('policies')
          .update({
            ...policyData,
            updated_at: new Date().toISOString()
          })
          .eq('policy_number', editingPolicy.policy_number);

        if (error) throw error;
        toast.success('Policy updated successfully!');
      } else {
        const { error } = await supabase
          .from('policies')
          .insert({
            ...policyData,
            policy_number: generatePolicyNumber(),
            user_id: session.user.id
          });

        if (error) throw error;
        toast.success('New policy created successfully!');
      }

      fetchPolicies();
      setEditingPolicy(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
  };

  const handleDeletePolicy = async (policyNumber) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      try {
        const { error } = await supabase
          .from('policies')
          .delete()
          .eq('policy_number', policyNumber);

        if (error) throw error;
        fetchPolicies();
        toast.success('Policy deleted successfully!');
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
  };

  if (!session) {
    return <Auth />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4">
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar
        toastClassName="!bg-white !shadow-lg"
      />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold text-blue-900">Insurance Policy Manager</h1>
          <button
            onClick={handleSignOut}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-6 text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 mb-8">
          <h2 className="text-xl font-medium text-blue-900 mb-6">
            {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
          </h2>
          <PolicyForm 
            onSave={handleSavePolicy}
            initialData={editingPolicy}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
          <h2 className="text-xl font-medium text-blue-900 mb-6">Policy List</h2>
          <PolicyList 
            policies={policies}
            onEdit={handleEditPolicy}
            onDelete={handleDeletePolicy}
          />
        </div>
      </div>
    </div>
  );
}

export default App;