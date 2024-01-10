import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
const SingleProperty = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [house,Sethouse]=useState();
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/property/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          }
        })
        .then((response) => {
         Sethouse(response.data.property);
        })
        .catch((error) => {
         console.log(error,"Property now error")
        });
      },[])
     
      return (
        <div>
          {house ? (
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">{house.name}</h2>
              <div className="mb-2">
                <p className="text-gray-600">{house.address.address1}, {house.address.address2}</p>
                <p className="text-gray-600">{house.address.city}, {house.address.state}, {house.address.pincode}</p>
              </div> 
              <div className="mb-4">
                {house.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Property ${index + 1}`}
                    className="w-full h-auto mb-2"
                  />
                ))}
              </div>
              <p className="text-lg font-semibold text-green-600">${house.price} per night</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )
          }

export default SingleProperty;