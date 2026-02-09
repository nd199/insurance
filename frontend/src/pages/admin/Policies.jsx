import { useEffect, useState } from 'react';
import { FiPlus, FiShield, FiEdit, FiTrash2 } from 'react-icons/fi';
import policyService from '../../api/services/policy.service';

const policyStatusStyles = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  EXPIRED: 'bg-rose-100 text-rose-700',
  SUSPENDED: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-slate-100 text-slate-700',
};

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const data = await policyService.getPolicies();
        setPolicies(data);
      } catch (err) {
        setError('Failed to load policies');
        console.error('Policies fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handleExpirePolicy = async (policyId) => {
    try {
      await policyService.expirePolicy(policyId);
      // Refresh policies list
      const data = await policyService.getPolicies();
      setPolicies(data);
    } catch (err) {
      console.error('Failed to expire policy:', err);
      setError('Failed to expire policy');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading policies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Policies</h1>
          <p className="text-sm text-slate-500">Manage insurance products</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700">
          <FiPlus /> Add Policy
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {policies.map(policy => (
          <div
            key={policy.id}
            className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {policy.policyName}
              </h3>
              <FiShield className="w-6 h-6 text-indigo-500" />
            </div>

            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>
                Premium: <span className="font-medium">${policy.premiumAmount}</span>
              </p>
              <p>
                Status: <span className="font-medium">{policy.status}</span>
              </p>
              <p>
                Created: <span className="font-medium">{new Date(policy.createdAt).toLocaleDateString()}</span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${policyStatusStyles[policy.status]}`}
              >
                {policy.status}
              </span>

              <div className="flex gap-3 text-slate-500">
                <button className="hover:text-indigo-600">
                  <FiEdit />
                </button>
                {policy.status === 'ACTIVE' && (
                  <button 
                    onClick={() => handleExpirePolicy(policy.id)}
                    className="hover:text-rose-600"
                    title="Expire Policy"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
