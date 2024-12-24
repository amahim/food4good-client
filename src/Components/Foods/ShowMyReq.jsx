import React from 'react';

const ShowMyReq = ({myReq}) => {

    const {foodName,donorName,requestDate,pickupLocation,expireDate} = myReq;
    
    return (
        <div className="border-b-2 border-[#2625229d] grid grid-cols-8 md:grid-cols-11 items-center">
      <td className="col-span-2 md:col-span-3 font-bold">{foodName}</td>
      <td className="col-span-2 ">{pickupLocation}</td>
      <td className="md:col-span-2 hidden md:block">{expireDate}</td>
      <td className="col-span-2 ">{requestDate}</td>
      <td className="col-span-2 ">{donorName}</td>
      
    </div>
    );
};

export default ShowMyReq;