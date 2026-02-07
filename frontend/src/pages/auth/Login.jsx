import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiLock,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import authService from '../../api/services/auth.service';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username required'),
    password: Yup.string().required('Password required'),
  });

  const handleSubmit = async values => {
    dispatch(loginStart());
    try {
      const res = await authService.login(values);
      dispatch(loginSuccess(res));

      navigate(
        res.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard',
        { replace: true }
      );
    } catch (err) {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, type: 'spring', stiffness: 100 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.03, y: -2 },
    tap: { scale: 0.98 },
  };

  const trustVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-8 space-y-6 border shadow-2xl backdrop-blur-sm bg-white/10 border-white/20 rounded-3xl">
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            <div className="flex items-center justify-center w-20 h-20 mx-auto shadow-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl ring-4 ring-white/30">
              <FiShield className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-transparent bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text">
                Insurance Portal
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Secure policy management
              </p>
            </div>
          </motion.div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              <motion.div
                custom={0}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold uppercase text-slate-800"
                >
                  Email
                </label>
                <div className="relative group">
                  <FiMail className="absolute text-gray-400 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-blue-500" />
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="policy@insurance.com"
                    className="w-full pl-12 pr-4 text-lg placeholder-gray-400 transition-all border-2 shadow-sm h-14 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:shadow-md"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-2 text-sm font-semibold text-red-500"
                />
              </motion.div>

              <motion.div
                custom={1}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold uppercase text-slate-800"
                >
                  Password
                </label>
                <div className="relative group">
                  <FiLock className="absolute text-gray-400 transition-colors -translate-y-1/2 left-4 top-1/2 group-focus-within:text-purple-500" />
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 text-lg placeholder-gray-400 transition-all border-2 shadow-sm h-14 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 hover:shadow-md"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-2 text-sm font-semibold text-red-500"
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 border border-red-200 shadow-sm rounded-2xl bg-red-50"
                >
                  <FiShield className="w-6 h-6 text-red-500" />
                  <span className="text-sm font-semibold text-red-700">
                    {error}
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative w-full font-bold text-white shadow-lg h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                {!isLoading && (
                  <FiArrowRight className="absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2" />
                )}
              </motion.button>
            </Form>
          </Formik>

          <motion.div
            variants={trustVariants}
            initial="hidden"
            animate="visible"
            className="pt-6 text-xs text-center border-t text-slate-500 border-slate-200/50"
          >
            <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                256-bit SSL
              </div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="flex items-center gap-1">
                <FiShield className="w-4 h-4 text-blue-500" />
                Enterprise Grade
              </div>
            </div>
            <p className="font-medium text-slate-500">Trusted by millions</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
