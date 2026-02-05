import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiUser, FiCheckCircle, FiPlus } from 'react-icons/fi';
import customerService from '../../api/services/customer.service';

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1 123 456 7890',
    },
    {
      id: 'CUST-002',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+1 987 654 3210',
    },
    {
      id: 'CUST-003',
      fullName: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phoneNumber: '+1 555 666 7777',
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = { fullName: '', email: '', phoneNumber: '' };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string(),
  });

  const fetchCustomers = async () => {
    try {
      const data = await customerService?.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await customerService.createCustomer(values);
      setMessage('Customer added successfully!');
      setError(null);
      fetchCustomers();
      resetForm();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add customer');
      setMessage(null);
      setTimeout(() => setError(null), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <motion.div
        className="max-w-4xl p-6 mx-auto shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Management
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add Customer
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 border shadow-sm rounded-2xl bg-white/90 backdrop-blur-sm"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <Field
                    name="fullName"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <Field
                    name="phoneNumber"
                    placeholder="+1 234 567 890"
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="px-6 py-2 mt-2 font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700"
                  >
                    Save Customer
                  </button>
                </div>
              </Form>
            </Formik>
          </motion.div>
        )}

        {message && (
          <motion.div
            className="flex items-center gap-2 p-3 mb-4 text-green-700 bg-green-100 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiCheckCircle className="w-5 h-5" />
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div
            className="flex items-center gap-2 p-3 mb-4 text-red-700 bg-red-100 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiCheckCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">Email</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Phone</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr
                  key={c.id}
                  className="transition-colors border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{c.fullName}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Customers;
