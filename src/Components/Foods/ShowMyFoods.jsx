import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ShowMyFoods = ({ myFood, myFoods, setMyFoods }) => {
  const { _id, foodName, status, expireDate, foodQuantity, pickupLocation } =
    myFood;

  // delete
  const handleDelete = (myFoodId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#37f51e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`https://food-sharing-server-pi.vercel.app/foods/${myFoodId}`)
          .then((res) => {
            const { foodDeleted, requestedFoodsDeleted } = res.data;

            if (foodDeleted.deletedCount > 0) {
              toast.success("Food deleted successfully");
            }

            // Update local state
            setMyFoods(myFoods.filter((myFood) => myFood._id !== myFoodId));
          });
      }
    });
  };

  // Dynamic class for status
  const statusBgClass =
    status === "Available"
      ? "text-green-600"
      : status === "Requested"
      ? "text-blue-600"
      : "text-red-700";

  return (
    <div className="border-b-2 border-[#2625229d] grid grid-cols-6 md:grid-cols-10 items-center">
      <td className="col-span-2 md:col-span-3 font-bold">{foodName}</td>
      <td className="col-span-1 hidden lg:block">{foodQuantity}</td>
      <td className="col-span-1 hidden lg:block">{pickupLocation}</td>
      {/* Status with dynamic background color */}
      <td
        className={`col-span-2 lg:col-span-1 text-center rounded-md px-2 py-1 ${statusBgClass}`}
      >
        {status}
      </td>
      <td className="col-span-2 hidden md:block">{expireDate}</td>
      <td className="col-span-1">
        <Link
          to={`/updateFood/${_id}`}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Update
        </Link>
      </td>
      <td className="col-span-1">
        <p
          onClick={() => handleDelete(_id)}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Delete
        </p>
      </td>
    </div>
  );
};

export default ShowMyFoods;
