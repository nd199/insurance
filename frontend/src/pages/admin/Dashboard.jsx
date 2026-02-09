import React, { useMemo, useState, useEffect } from 'react';
import { HiShieldCheck, HiClock } from 'react-icons/hi';
import { HiSignal } from 'react-icons/hi2';
import policyService from '../../api/services/policy.service';
import customerService from '../../api/services/customer.service';
import assignmentService from '../../api/services/assignment.service';

const policyStatusStyles = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  EXPIRED: 'bg-rose-100 text-rose-700',
  SUSPENDED: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-slate-100 text-slate-700',
};

export default function AdminDashboard() {
  const [policies, setPolicies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [policiesData, customersData, assignmentsData] = await Promise.all([
          policyService.getPolicies(),
          customerService.getCustomers(),
          assignmentService.getAssignments(),
        ]);
        setPolicies(policiesData);
        setCustomers(customersData);
        setAssignments(assignmentsData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const activePolicies = useMemo(
    () => policies.filter(policy => policy.status === 'ACTIVE'),
    [policies]
  );

  const totalCustomers = customers.length;
  const activeAssignments = assignments.filter(assignment => 
    assignment.policy?.status === 'ACTIVE'
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
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
                Admin User
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
                Total Customers
              </p>
              <p className="text-3xl font-semibold text-slate-900">
                {totalCustomers}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Registered customers
              </p>
            </div>

            <div className="p-4 bg-white border rounded-2xl border-slate-100">
              <p className="text-sm font-medium text-slate-500">Active Assignments</p>
              <p className="text-3xl font-semibold text-slate-900">{activeAssignments}</p>
              <p className="flex items-center gap-1 mt-1 text-sm text-amber-500">
                <HiClock className="w-4 h-4" />
                Policies currently assigned
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
                {policies.length} Policies Active & Expired
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
            {policies.map(policy => (
              <article
                key={policy.id}
                className="flex min-h-[200px] flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    POL-{policy.id}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${policyStatusStyles[policy.status]}`}
                  >
                    {policy.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {policy.policyName}
                  </h3>
                  <p className="text-sm text-slate-500">Premium: ${policy.premiumAmount}</p>
                  <p className="text-sm font-semibold text-slate-700">
                    Status: {policy.status}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                  <div>
                    <p>Created</p>
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(policy.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p>Updated</p>
                    <p className="text-sm font-medium text-slate-800">
                      {new Date(policy.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
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
