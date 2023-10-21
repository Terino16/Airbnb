import React, { useState,useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { UserContext} from '../Usercontext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [result, setResult] = useState('');
  useEffect(() => {
    setResult('');
  }, []);
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const {setuser}=useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupData.username !== '' && signupData.password !== '') {
      axios.post("http://localhost:3001/user/signup", { // Use Axios.post
        username: signupData.username,
        password: signupData.password,
      })
        .then((response) => {
          setResult(response.data.message);
         localStorage.setItem("token",response.data.token)
          setuser(response.data.name);
          navigate('/');
        })
        .catch((error) => {
          if (error.response) {
            setResult(error.response.data.message);
          } else {
            setResult('An error occurred.');
          }
        });
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {result === 'Already exist' ? ( 
          <div>
          <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
              type="submit"
              onClick={() =>{ setResult('')}}>
          Try Again? 
          </button>
          {result}
          </div>
        ):(
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                name="username"
                placeholder="Name"
                value={signupData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Sign Up
            </button>
          </form>
       )  
        } 
      </div>
    </div>
  );
};

export default Signup;
