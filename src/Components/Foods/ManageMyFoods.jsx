import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ShowMyFoods from "./ShowMyFoods";
import { Link } from "react-router-dom";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    fetch(
      `https://food-sharing-server-pi.vercel.app/foods?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyFoods(data));
  }, [user?.email]);

  return (
    <div className="w-[90%] mx-auto pt-36">
      {/* Header */}
      <div>
        <p className="lg:text-4xl text-[#262522] md:text-3xl font-bold text-center text-2xl">
          Manage My Foods
        </p>
      </div>
      {/* Conditional rendering */}
      {myFoods.length > 0 ? (
        <table className="table mt-10">
          {/* Head */}
          <thead>
            <tr className="grid grid-cols-6 md:grid-cols-10 border-b-2 border-black">
              <th className="col-span-2 md:col-span-3">Name</th>
              <th className="col-span-1 hidden lg:block">Quantity</th>
              <th className="col-span-1 hidden lg:block">Pickup</th>
              <th className="col-span-2 lg:col-span-1">Status</th>
              <th className="col-span-2 hidden md:block">Expire Date</th>
              <th className="col-span-1">Update</th>
              <th className="col-span-1">Delete</th>
            </tr>
          </thead>
          <tbody>
            {myFoods.map((myFood) => (
              <ShowMyFoods
                key={myFood._id}
                myFood={myFood}
                myFoods={myFoods}
                setMyFoods={setMyFoods}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-10 text-center space-y-5">
          <p className="text-gray-500 text-xl font-medium">
            You haven't added any food yet!
          </p>
          <Link to="/addFood" className="btn bg-[#262522] text-white">
            Add Food
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
