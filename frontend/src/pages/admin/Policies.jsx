import { useEffect, useState } from 'react';
import { FiPlus, FiShield, FiEdit, FiTrash2 } from 'react-icons/fi';

const samplePolicies = [
  {
    id: 1,
    name: 'Health Insurance Premium',
    coverage: '$50,000',
    premium: 1200,
    duration: '1 Year',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Car Insurance Standard',
    coverage: '$25,000',
    premium: 800,
    duration: '1 Year',
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: 'Home Insurance Basic',
    coverage: '$100,000',
    premium: 1500,
    duration: '2 Years',
    status: 'INACTIVE',
  },
];

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    setPolicies(samplePolicies);
  }, []);

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
                {policy.name}
              </h3>
              <FiShield className="w-6 h-6 text-indigo-500" />
            </div>

            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>
                Coverage: <span className="font-medium">{policy.coverage}</span>
              </p>
              <p>
                Premium: <span className="font-medium">${policy.premium}</span>
              </p>
              <p>
                Duration: <span className="font-medium">{policy.duration}</span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  policy.status === 'ACTIVE'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {policy.status}
              </span>

              <div className="flex gap-3 text-slate-500">
                <button className="hover:text-indigo-600">
                  <FiEdit />
                </button>
                <button className="hover:text-rose-600">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
