import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext} from '../Usercontext'

const Airbnbyourhome = () => {
    const token = localStorage.getItem('token');
    const {user}=useContext(UserContext);
    const [addhome, Setaddhome] = useState({
        name: '',
        address: {
            address1: '',
            address2: '',
            city: '',
            state: '',
            pincode: '',
        },
        imageUrls: [],
        price: 0,
        user:user
    });

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        Setaddhome((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to handle changes in nested address fields
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        Setaddhome((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }));
    };

    // Function to handle image uploads
    const handleImageURLAdd = () => {
        const imageUrlInput = document.getElementById('imageUrlInput');
        const imageUrl = imageUrlInput.value;
        
        if (imageUrl.trim() !== '') {
            Setaddhome((prevState) => ({
                ...prevState,
                imageUrls: [...prevState.imageUrls, imageUrl],
            }));

            // Clear the input field after adding the URL
            imageUrlInput.value = '';
            
        }
    };


    const handlesubmit = (e) => {
        e.preventDefault();
        if (addhome.name !== '' && addhome.address.address1 !== '') {
            const axiosInstance = axios.create({
                baseURL: '/your-backend-endpoint', // Replace with your actual backend URL
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Include the token in the request headers
                },
              });
          axiosInstance.post("http://localhost:3001/property/airbnbyourhome", {
           addhome
          })
            .then((response) => {
            //   setResult(response.data.message);
            //   Cookies.set('token',response.data.token);
            //   setuser(response.data.token);
            //   navigate('/');
            console.log(response)
            })
            .catch((error) => {
              if (error.response) {
                // setResult(error.response.data.message);
              } else {
                // setResult('An error occurred.');
              }
            });
          
        } else {
          alert('Invalid username or password. Please try again.');
        }
      };
    
    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Add Your Home on Airbnb</h2>
            <form onSubmit={handlesubmit}>
                <label className="block mb-2">
                    Home Name:
                    <input
                        className="border rounded p-2 w-full"
                        type="text"
                        name="name"
                        value={addhome.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="block mb-2">
                    Address Line 1:
                    <input
                        className="border rounded p-2 w-full"
                        type="text"
                        name="address1"
                        value={addhome.address.address1}
                        onChange={handleAddressChange}
                    />
                </label>
                <label className="block mb-2">
                    Address Line 2:
                    <input
                        className="border rounded p-2 w-full"
                        type="text"
                        name="address2"
                        value={addhome.address.address2}
                        onChange={handleAddressChange}
                    />
                </label>
                <label className="block mb-2">
                    City:
                    <input
                        className="border rounded p-2 w-full"
                        type="text"
                        name="city"
                        value={addhome.address.city}
                        onChange={handleAddressChange}
                    />
                </label>
                <label className="block mb-2">
                    State:
                    <input
                        className="border rounded p-2 w-full"
                        type="text"
                        name="state"
                        value={addhome.address.state}
                        onChange={handleAddressChange}
                    />
                </label>
                <label className="block mb-2">
                    Pincode:
                    <input
                        className="border rounded p-2 w-full"
                        type="text"
                        name="pincode"
                        value={addhome.address.pincode}
                        onChange={handleAddressChange}
                    />
                </label>
                <label className="block mb-2">
                <div className=" mb-2 block">
                    Image URLs:
                    <div className='flex'>
                    <input
                        id="imageUrlInput"
                        className="border rounded p-2 w-full"
                        type="text"
                        name="imageUrl"
                        placeholder="Add image URL"
                    />
                    <button type="button" className='p-3 bg-red-500 text-white font-normal rounded-sm' onClick={handleImageURLAdd}>
                        Add
                    </button>
                    </div>
                </div>
                {/* Display added image URLs */}
                {addhome.imageUrls.map((url, index) => (
                    <div key={index} className="block mb-2">
                        Image URL {index + 1}: {url}
                    </div>
                ))}
                </label>
                <label className="block mb-2">
                    Price:
                    <input
                        className="border rounded p-2 w-full"
                        type="number"
                        name="price"
                        value={addhome.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="block mb-2">
                    User:{user}
                   
                </label>

                <button type="submit" className=" p-3 bg-red-500 text-white font-normal rounded-sm ">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Airbnbyourhome;
