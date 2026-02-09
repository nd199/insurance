import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HiShieldCheck, HiClock } from 'react-icons/hi';
import { HiSignal } from 'react-icons/hi2';
import customerService from '../../api/services/customer.service';

const policyStatusStyles = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  EXPIRED: 'bg-rose-100 text-rose-700',
  SUSPENDED: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-slate-100 text-slate-700',
};

export default function CustomerDashboard() {
  const { user } = useSelector(state => state.auth);
  const [customerPolicies, setCustomerPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerPolicies = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const policies = await customerService.getCustomerPolicies(user.id);
        setCustomerPolicies(policies);
      } catch (err) {
        setError('Failed to load your policies');
        console.error('Customer policies fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerPolicies();
  }, [user?.id]);

  const activePolicies = useMemo(
    () => customerPolicies.filter(assignment => assignment.policy?.status === 'ACTIVE'),
    [customerPolicies]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your policies...</div>
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
    <div className="min-h-screen px-4 py-6 bg-slate-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Welcome Card */}
        <div className="px-6 py-6 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Welcome back
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                {user?.username || 'Customer'}
              </h1>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition border rounded-full shadow-sm border-slate-200 bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
              <HiShieldCheck className="w-4 h-4" aria-hidden="true" />
              View Policy Summary
            </button>
          </div>

          <div className="grid gap-4 mt-6 sm:grid-cols-3">
            <div className="p-4 border rounded-2xl border-slate-100 bg-slate-50">
              <p className="text-sm font-medium text-slate-500">Active Plans</p>
              <p className="text-3xl font-semibold text-slate-900">
                {activePolicies.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>

            <div className="p-4 bg-white border rounded-2xl border-slate-100">
              <p className="text-sm font-medium text-slate-500">
                Total Policies
              </p>
              <p className="text-3xl font-semibold text-slate-900">
                {customerPolicies.length}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                All your policies
              </p>
            </div>

            <div className="p-4 bg-white border rounded-2xl border-slate-100">
              <p className="text-sm font-medium text-slate-500">Inactive Policies</p>
              <p className="text-3xl font-semibold text-slate-900">
                {customerPolicies.filter(assignment => assignment.policy?.status !== 'ACTIVE').length}
              </p>
              <p className="flex items-center gap-1 mt-1 text-sm text-amber-500">
                <HiClock className="w-4 h-4" />
                Expired or cancelled
              </p>
            </div>
          </div>
        </div>

        {/* Assigned Policies */}
        <section className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Assigned Policies
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                {customerPolicies.length} Policies Active & Expired
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 font-semibold text-green-700 rounded-full bg-green-50">
                Active
              </span>
              <span className="px-3 py-1 font-semibold rounded-full bg-rose-50 text-rose-600">
                Expired
              </span>
              <span className="px-3 py-1 font-semibold rounded-full bg-amber-50 text-amber-600">
                Suspended
              </span>
              <span className="px-3 py-1 font-semibold rounded-full bg-slate-50 text-slate-600">
                Cancelled
              </span>
            </div>
          </div>

          <div className="grid gap-4 mt-6 md:grid-cols-2">
            {customerPolicies.map(assignment => (
              <article
                key={assignment.id}
                className="flex min-h-[200px] flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    POL-{assignment.policy?.id}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${policyStatusStyles[assignment.policy?.status]}`}
                  >
                    {assignment.policy?.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {assignment.policy?.policyName}
                  </h3>
                  <p className="text-sm text-slate-500">Premium: ${assignment.policy?.premiumAmount}</p>
                  <p className="text-sm font-semibold text-slate-700">
                    Assigned: {new Date(assignment.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                  <div>
                    <p>Start Date</p>
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(assignment.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p>Policy Status</p>
                    <p className="text-sm font-medium text-slate-800">
                      {assignment.policy?.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5 text-xs font-semibold text-slate-600">
                  <HiSignal className="w-4 h-4" aria-hidden="true" />
                  <span>Coverage monitored hourly</span>
                </div>
              </article>
            ))}
          </div>

          <div className="p-6 mt-8 text-sm text-center bg-white border border-dashed rounded-2xl border-slate-200 text-slate-500">
            <p>
              No new alerts for today. All policies synced with the insurer
              portal.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
