import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiPlus, FiCheckCircle, FiUsers } from 'react-icons/fi';
import customerService from '../../api/services/customer.service';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string(),
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (err) {
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await customerService.createCustomer(values);
      setMessage('Customer created successfully');
      setError(null);
      resetForm();
      setShowForm(false);
      fetchCustomers();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create customer');
      setTimeout(() => setError(null), 3000);
    }
  };

  let customersContent;

  if (loading) {
    customersContent = (
      <p className="text-center text-slate-500">Loading customers...</p>
    );
  } else if (customers.length === 0) {
    customersContent = (
      <p className="text-center text-slate-500">No customers found</p>
    );
  } else {
    customersContent = (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3">{c.fullName}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phoneNumber || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl p-6 mx-auto bg-white shadow-xl rounded-3xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <FiUsers /> Customers
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            <FiPlus /> Add Customer
          </button>
        </div>

        {showForm && (
          <div className="p-4 mb-6 border rounded-2xl bg-slate-50">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="fullName" className="text-sm font-semibold">
                    Full Name
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="text-sm font-semibold">
                    Phone
                  </label>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-green-600 rounded-xl hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        )}

        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-xl">
            {error}
          </div>
        )}

        {message && (
          <div className="flex items-center gap-2 p-3 mb-4 text-green-700 bg-green-100 rounded-xl">
            <FiCheckCircle /> {message}
          </div>
        )}

        {customersContent}
      </motion.div>
    </div>
  );
};

export default Customers;
