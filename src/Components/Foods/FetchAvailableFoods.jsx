import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowAvailableFoods from "./ShowAvailableFoods";
import toast from "react-hot-toast";

const FetchAvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [isGridTwo, setIsGridTwo] = useState(false); // State for layout toggle

  // Fetch Available foods based on search query
  useEffect(() => {
    if (search === "") {
      // If search is empty, show all Available foods
      axios
        .get("https://food-sharing-server-pi.vercel.app/foods")
        .then((res) => {
          const AvailableFoods = res.data.filter(
            (food) => food.status === "Available"
          );
          setFoods(AvailableFoods);
        });
    } else {
      // If there is a search, fetch foods that match the search
      axios
        .get(
          `https://food-sharing-server-pi.vercel.app/foods?searchParams=${search}`
        )
        .then((res) => {
          const AvailableFoods = res.data.filter(
            (food) => food.status === "Available"
          );
          setFoods(AvailableFoods);
        });
    }
  }, [search]);

  // Sort by exp date
  const handleSortByDate = () => {
    const sortedFoods = [...foods]
      .sort((a, b) => new Date(a.expireDate) - new Date(b.expireDate))
      .filter((food) => food.status === "Available"); // Filter "Available"
    setFoods(sortedFoods);
    toast.success("Foods are sorted by recently expiring!");
  };

  // Toggle layout between grid-cols-2 and grid-cols-3
  const toggleLayout = () => {
    setIsGridTwo(!isGridTwo);
    toast.success(
      isGridTwo
        ? "Switched to 3-column layout!"
        : "Switched to 2-column layout!"
    );
  };

  return (
    <div className="w-[90%] mx-auto pt-36">
      {/* Headers */}
      <div>
        <p className="lg:text-4xl text-[#262522] md:text-3xl font-bold text-center text-2xl">
          Available Foods In Our Site
        </p>
      </div>
      {/* Search Input */}
      <div className="py-5 flex md:flex-row flex-col items-center gap-2">
        <div className="w-full md:w-3/5">
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search foods"
            className="rounded-md border-2 border-[#ee6352] px-4 py-3 w-full"
          />
        </div>
        <div className="w-full md:w-2/5 flex gap-2">
          <div className="lg:w-1/2 w-full">
            <button
              onClick={handleSortByDate}
              className="btn border-2 rounded-md border-[#ee6352] w-full"
            >
              Sort By Expire Date
            </button>
          </div>
          {/* Layout Toggle Button */}
          <div className="lg:w-1/2 w-full hidden lg:block">
            <button
              onClick={toggleLayout}
              className="btn border-2 rounded-md border-[#ee6352] w-full"
            >
              Change Layout
            </button>
          </div>
        </div>
      </div>
      {/* Foods Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          isGridTwo ? "lg:grid-cols-2" : "lg:grid-cols-3"
        } gap-4 mt-10`}
      >
        {foods.map((food) => (
          <ShowAvailableFoods food={food} key={food._id} />
        ))}
      </div>
    </div>
  );
};

export default FetchAvailableFoods;
