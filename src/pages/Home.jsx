import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/Usercontext";
import axios from "axios";
import MyCarousel from "../components/MyCarousel";
import { Link } from "react-router-dom";
const Home = () => {
  const [homes, Sethomes] = useState([]);
  const { user,setuser } = useContext(UserContext);
  console.log(user,"Hi");
  useEffect(() => {
     const token=localStorage.getItem("token");
     if(token)
     {
      const name=localStorage.getItem("name");
      setuser(name);
     }
    axios
      .get("http://localhost:3001/property/getproperties")
      .then((response) => {
        Sethomes(response.data.property);
      })
      .catch((error) => {
        if (error.response) {
        } else {
        }
      });
  }, []);

  return (
    <div className="grid md:grid-cols-2  lg:grid-cols-4 gap-1 ">
      {homes.map((item, index) => (
        <Link key={index} className=" p-2 mb-4 rounded-lg" to={`/property/${item._id}`}>
          <MyCarousel item={item}/>
          <h2 className="font-semibold text-sm">{item.name}</h2>
          <p className=" text-gray-800  text-sm">{item.address.address1}</p>
          <p className="  mb-2 font-light text-gray-400 text-sm">
            {item.address.address2}
          </p>
          <p className="  mb-2 font-bold text-sm flex">
            Rs: {item.price} <p className="font-normal"> Excluding GST</p>
          </p>
        </Link>
      ))}
      
    </div>
  );
};

export default Home;
