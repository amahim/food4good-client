import React from 'react';
import { Link } from 'react-router-dom';

const ShowFetFoods = ({fetFood}) => {

    const {_id,foodName,foodImage,foodQuantity,status} = fetFood;


    return (
        <div>
            <div className="border-2 border-[#ee6352] flex flex-col max-w-lg p-4 space-y-4 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
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
            Quantity : <span className="font-medium">{foodQuantity}</span> 
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

export default ShowFetFoods;