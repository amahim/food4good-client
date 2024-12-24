import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";

const UpdateFood = () => {
  const food = useLoaderData();

  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expireDate,
    additionalNotes,
    status,
    donor,
  } = food;

  const { name, email, image } = donor;
  const navigate = useNavigate();

  const handleUpdateFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedFood = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      foodQuantity: parseInt(form.foodQuantity.value),
      pickupLocation: form.pickupLocation.value,
      expireDate: form.expireDate.value,
      additionalNotes: form.additionalNotes.value,
      status: form.status.value,
    };

    // Update food data in the database
    axios
      .patch(
        `https://food-sharing-server-pi.vercel.app/foods/${_id}`,
        updatedFood
      )
      .then((res) => {
        toast.success("Food updated successfully!");
        navigate("/myFoods");
      });
  };

  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div>
        <p className="lg:text-4xl text-[#262522] md:text-3xl font-bold text-center text-2xl">
          Update Food Details
        </p>
      </div>
      {/* Go back button */}
      <div className="md:w-2/3 mx-auto">
        <button
          onClick={() => navigate("/myFoods")}
          className="flex items-center gap-2 text-[#262522] text-lg md:text-xl px-4 py-2 rounded-md"
        >
          <FaArrowCircleLeft />
        </button>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center mt-5">
        <form
          onSubmit={handleUpdateFood}
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
                defaultValue={foodName}
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
                defaultValue={foodQuantity}
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
                defaultValue={foodImage}
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
                defaultValue={pickupLocation}
                placeholder="Enter Pickup Location"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Expire Date & Status */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Expire Date
              </label>
              <input
                type="date"
                name="expireDate"
                defaultValue={expireDate}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                defaultValue={status}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
                {/* <option value="Requested">Requested</option> */}
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
              defaultValue={additionalNotes}
              placeholder="Enter any additional notes"
              className="w-full border rounded-md p-2"
              rows="3"
            ></textarea>
          </div>

          {/* Donor Info */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Donator Name
              </label>
              <input
                type="text"
                name="donorName"
                value={name}
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
                value={email}
                className="w-full border-2 border-white rounded-md p-2"
                readOnly
                disabled
              />
            </div>
          </div>

          {/* Donator Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Donator Photo
            </label>
            <input
              type="url"
              name="donorPhoto"
              value={image}
              className="w-full rounded-md p-2 border-2 border-white"
              readOnly
              disabled
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-[#ee6352] border-none text-white"
            >
              Update Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
