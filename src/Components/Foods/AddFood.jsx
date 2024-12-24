import Lottie from "lottie-react";
import React, { useContext } from "react";
import addfood from "../../assets/addfood.json";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const handleAddFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodQuantity = parseInt(form.foodQuantity.value);
    const pickupLocation = form.pickupLocation.value;
    const expireDate = form.expireDate.value;
    const additionalNotes = form.additionalNotes.value;
    const status = form.status.value;

    // Check if foodQuantity is a valid number
    if (isNaN(foodQuantity) || foodQuantity <= 0) {
      toast.error("Please enter a valid food quantity.");
      return;
    }

    const donor = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    };

    const newFood = {
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expireDate,
      additionalNotes,
      status,
      donor,
    };

    // Posting data to the database
    axios
      .post("https://food-sharing-server-pi.vercel.app/foods", newFood)
      .then((res) => {
        toast.success("Food successfully added!");
        form.reset(); // Reset the form after successful submission
      })
      .catch((err) => {
        // console.error(err);
        toast.error("Failed to add food. Please try again.");
      });
  };

  return (
    <div className="w-[90%] mx-auto">
      {/* Headers */}
      <div>
        <p className="lg:text-4xl text-[#262522] md:text-3xl font-bold text-center text-2xl">
          Add Food and Make Smile
        </p>
      </div>
      {/* Form Section */}
      <div className="flex flex-col-reverse md:flex-row md:justify-around justify-center items-center mt-10">
        <form
          onSubmit={handleAddFood}
          className="border-2 rounded-2xl border-[#2625229d] w-full md:w-2/3 p-5"
        >
          {/* Food Name & Food Quantity */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                placeholder="Enter Food Name"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Food Quantity
              </label>
              <input
                type="number"
                name="foodQuantity"
                placeholder="Enter Food Quantity"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Food Image & Pickup Location */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Food Image URL
              </label>
              <input
                type="url"
                name="foodImage"
                placeholder="Enter Food Image URL"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                placeholder="Enter Pickup Location"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row gap-4">
            {/* Expire Date */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Expire Date
              </label>
              <input
                type="date"
                name="expireDate"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            {/* Status */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="w-full border rounded-md p-2"
                defaultValue="Available"
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              placeholder="Enter any additional notes"
              className="w-full border rounded-md p-2"
              rows="3"
            ></textarea>
          </div>

          {/* Donator Info */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Donator Name
              </label>
              <input
                type="text"
                name="donorName"
                value={user.displayName || ""}
                className="w-full rounded-md p-2 border-2 border-white"
                readOnly
                disabled
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Donator Email
              </label>
              <input
                type="email"
                name="donorEmail"
                disabled
                value={user.email || ""}
                className="w-full border-2 border-white rounded-md p-2"
                readOnly
              />
            </div>
          </div>

          {/* Donator Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Donator Photo
            </label>
            <input
              disabled
              type="url"
              name="donorPhoto"
              value={user.photoURL || ""}
              className="w-full rounded-md p-2 border-2 border-white"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-[#ee6352] border-none text-white"
            >
              Add Food
            </button>
          </div>
        </form>

        <div className="w-full md:w-1/3 -mt-32 md:-mt-0">
          <Lottie animationData={addfood}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
