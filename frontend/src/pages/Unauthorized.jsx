import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 via-blue-50/50 to-indigo-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md p-10 space-y-6 text-center border border-gray-200 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl"
      >
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full shadow-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600">
          <FiAlertTriangle className="w-10 h-10 text-white drop-shadow-md" />
        </div>
        <h1 className="text-3xl font-extrabold text-red-600">403</h1>
        <p className="text-lg font-medium text-gray-700">
          You do not have permission to access this page.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-6 py-3 mt-4 font-semibold text-white bg-red-500 shadow-md rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
