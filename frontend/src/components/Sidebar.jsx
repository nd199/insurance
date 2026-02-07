import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiLogOut,
  FiShield,
} from 'react-icons/fi';
import { logout } from '../store/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/admin/customers', label: 'Customers', icon: FiUsers },
    { to: '/admin/policies', label: 'Policies', icon: FiFileText },
    { to: '/admin/assign-policy', label: 'Assign Policy', icon: FiShield },
  ];

  const customerLinks = [
    { to: '/customer/dashboard', label: 'My Policies', icon: FiFileText },
  ];

  const links = user?.role === 'ADMIN' ? adminLinks : customerLinks;

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-slate-100">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <FiShield className="w-6 h-6 text-indigo-400" />
        <span className="text-lg font-bold tracking-wide">Insurance</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition text-slate-300 rounded-xl hover:bg-rose-600 hover:text-white"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
