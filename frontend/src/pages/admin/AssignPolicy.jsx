import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiUser, FiFileText, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import policyService from '../../api/services/policy.service';

const AssignPolicy = () => {
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = {
    customerId: '',
    policyId: '',
    startDate: '',
    endDate: '',
  };

  const validationSchema = Yup.object({
    customerId: Yup.string().required('Select a customer'),
    policyId: Yup.string().required('Select a policy'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date cannot be before start date')
      .required('End date is required'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersRes = await policyService.getCustomers();
        setCustomers(customersRes);
        const policiesRes = await policyService.getPolicies();
        setPolicies(policiesRes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await policyService.assignPolicy(values);
      setMessage('Policy assigned successfully!');
      setError(null);
      resetForm();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Assignment failed');
      setMessage(null);
      setTimeout(() => setError(null), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <motion.div
        className="max-w-2xl p-8 mx-auto shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Assign Policy to Customer
        </h2>

        {message && (
          <motion.div
            className="flex items-center gap-2 p-3 mb-4 text-green-700 bg-green-100 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiCheckCircle className="w-5 h-5" />
            <span>{message}</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="flex items-center gap-2 p-3 mb-4 text-red-700 bg-red-100 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiCheckCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Customer
              </label>
              <div className="relative">
                <FiUser className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <Field
                  as="select"
                  name="customerId"
                  className="w-full h-12 pl-10 pr-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.fullName}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="customerId"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Policy
              </label>
              <div className="relative">
                <FiFileText className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <Field
                  as="select"
                  name="policyId"
                  className="w-full h-12 pl-10 pr-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                >
                  <option value="">Select Policy</option>
                  {policies.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.policyName}
                    </option>
                  ))}
                </Field>
              </div>
              <ErrorMessage
                name="policyId"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Start Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <Field
                    type="date"
                    name="startDate"
                    className="w-full h-12 pl-10 pr-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                </div>
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  End Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <Field
                    type="date"
                    name="endDate"
                    className="w-full h-12 pl-10 pr-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                </div>
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 mt-4 font-semibold text-white shadow-lg rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300/50"
            >
              Assign Policy
            </motion.button>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
};

export default AssignPolicy;
