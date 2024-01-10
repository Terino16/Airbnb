import React, { useState,useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { UserContext} from '../Context/Usercontext'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [result, setResult] = useState('');
  useEffect(() => {
    setResult('');
  }, []);
  const [signindata, setSignindata] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const {setuser}=useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignindata({ ...signindata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signindata.username !== '' && signindata.password !== '') {
      axios.post("http://localhost:3001/user/signin", { // Use Axios.post
        username: signindata.username,
        password: signindata.password,
      })
        .then((response) => {
          setResult(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name",response.data.user.username)
          setuser(response.data.user.username);
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
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        {result === 'Already exist' ? ( 
          <div>
          <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
              type="submit"
              onClick={() =>{ console.log(result)
                setResult('')}}>
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
                value={signindata.username}
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
                value={signindata.password}
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

export default Login;