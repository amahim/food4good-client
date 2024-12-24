import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import ShowMyReq from "./ShowMyReq";
const FetchMyReq = () => {
  const { user } = useContext(AuthContext);
  const [myReqs, setMyReqs] = useState([]);

  useEffect(() => {
    fetch(
      `https://food-sharing-server-pi.vercel.app/requested-foods?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyReqs(data));
  }, [user?.email]);
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div>
        <p className="lg:text-4xl text-[#262522] md:text-3xl font-bold text-center text-2xl">
          My Requested Foods
        </p>
      </div>
      {/* Conditional rendering */}
      {myReqs.length > 0 ? (
        <table className="table mt-10">
          {/* Head */}
          <thead>
            <tr className="grid grid-cols-8 md:grid-cols-11 border-b-2 border-black">
              <th className="col-span-2 md:col-span-3">Name</th>
              <th className="col-span-2">Pickup</th>
              <th className="col-span-2 hidden md:block">Expire Date</th>
              <th className="col-span-2">Request Date</th>
              <th className="col-span-2">Donor</th>
            </tr>
          </thead>
          <tbody>
            {myReqs.map((myReq) => (
              <ShowMyReq key={myReq._id} myReq={myReq} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-10 text-center space-y-5">
          <p className="text-gray-500 text-xl font-medium">
            You haven't requested any food yet!
          </p>
          <Link to="/availableFoods" className="btn bg-[#262522] text-white">
            Request Foods
          </Link>
        </div>
      )}
    </div>
  );
};

export default FetchMyReq;
