import React, { useState } from 'react';
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import RegisterForm from '../components/Categories/RegisterForm';
import { Spin } from 'antd'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sending Login Payload 

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('broker');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      role,
    };

    try {
      setLoading(true);

      if (formData.role.length > 0) {
        let Response = await axios.post('https://privatejetcharters-server-ttz1.onrender.com/api/admin/login', formData);
        setLoading(false)
        return (Response)
      }
      else {
        message.error('Select User Role');
      }

      // message.success('User Registered !!!')
    }
    catch (error) {
      setLoading(false)
      // message.error(error);
    }
    return (formData);
  };





  const onFinish = async (values) => {
    try {
      const response = await handleSubmit(values);
      if (response) {
        localStorage.setItem('admin', true);
        console.log(response)
        localStorage.setItem('role', response?.data.details.role)
        localStorage.setItem('user', response?.data.details.name)


        // message.success(response.data.message);
        // console.log('suhail')

        navigate("/dashboard");

      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "An error occurred during login.");
    }
  };
  return (
    <div className="flex items-center relative justify-center min-h-screen">
      {
        loading && <div className="z-40 bg-gray-300 inset-0 bg-opacity-40 flex items-center absolute justify-center">
          <Spin size="large" />
        </div>
      }
      <div className="w-full max-w-lg p-12 space-y-8 transition duration-500 transform rounded-lg shadow-2xl hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-blue-800">Welcome Back!</h1>
        <form class="max-w-sm mx-auto w-[100%] p-5 rounded-lg" onSubmit={onFinish} >

          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium  dark:text-black"> Email</label>
            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>

            <input type="password" id="password"
              placeholder="Password" class="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div class="max-w-sm mx-auto">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Select Role</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " onChange={(e) => setRole(e.target.value)}>

              <option value={''}>Select User Role</option>
              <option value={'broker'}>Broker</option>
              <option value={'operator'}>Operator</option>
              <option value={'user-admin'}>User-admin</option>
              <option value={'super-admin'}>Super-admin</option>
            </select>
          </div>

          <button type="submit" class="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg border-none outline-none text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Log In </button>
        </form>




        {/* <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <div className="flex flex-col gap-4">
            <button
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Login
            </button>
            <div className='flex gap-2'>
              <h3>Dont have an account ?</h3>
              <Link className='font-semibold text-blue-600 hover:underline' to={"/register"}>Register here</Link>
            </div>
          </div>
        </Form> */}
      </div>

      {/* <RegisterForm/> */}

    </div>
  );
};

export default Login;
