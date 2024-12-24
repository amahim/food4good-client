import React from "react";
import { Link } from "react-router-dom";

const ShowAvailableFoods = ({ food }) => {
  const { _id, foodName, foodImage, expireDate,status } = food;
  const {name,image,email} = food.donor;

  return (
    <div>
      <div className="border-2 border-[#ee6352] flex flex-col max-w-lg p-4 space-y-4 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
        <div className="flex space-x-4">
          <img
            alt="User Img"
            src={image}
            className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
          />
          <div className="flex flex-col space-y-1">
            <p
              className="text-sm font-semibold"
            >
              {name}
            </p>
            <span className="text-sm">{email}</span>
          </div>
        </div>
        <div>
          <img
            src={foodImage}
            alt="Food img"
            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
          />
          <h2 className="mb-1 text-xl font-semibold">
           {foodName}
          </h2>
          <p className="text-sm font-bold dark:text-gray-600">
            Expire Date : <span className="font-medium">{expireDate}</span> 
          </p>
          <p className="text-sm font-bold dark:text-gray-600">
            Status : <span className="font-medium">{status}</span> 
          </p>
        </div>
       
          <div className="">
            <Link to={`/foods/${_id}`} className="text-white btn bg-[#ee6352] border-none w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ShowAvailableFoods;
