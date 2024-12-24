import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowFetFoods from "./ShowFetFoods";
import { Link } from "react-router-dom";

const FetchFetFoods = () => {
  const [FetFoods, setFetFoods] = useState([]);

  // fetching/getting data
  useEffect(() => {
    axios.get("https://food-sharing-server-pi.vercel.app/foods").then((res) => {
      // Sorting foods by foodQuantity
      const topFoods = res.data
        .sort((a, b) => b.foodQuantity - a.foodQuantity)
        .slice(0, 6); // the top 6 foods

      setFetFoods(topFoods);
    });
  }, []);

  return (
    <div className="w-[90%] mx-auto">
      {/* Headers */}
      <div className="mt-10">
        <p className="lg:text-4xl text-[#262522] md:text-3xl font-bold text-center text-2xl">
          Featured Foods
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {FetFoods.map((fetFood) => (
          <ShowFetFoods fetFood={fetFood} key={fetFood._id} />
        ))}
      </div>
      <div className="mt-5 text-center">
        <Link to="/availableFoods" className="btn bg-[#262522] text-white">
          Show All Foods
        </Link>
      </div>
    </div>
  );
};

export default FetchFetFoods;
