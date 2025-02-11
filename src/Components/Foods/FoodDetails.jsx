import React, { useContext, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const food = useLoaderData();
  const { user } = useContext(AuthContext);

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

  const { name, image, email } = donor;
  const navigate = useNavigate();

  // State for handling modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const day = newDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // State for modal form data
  const [requestData, setRequestData] = useState({
    foodName,
    foodImage,
    foodId: _id,
    donorEmail: email,
    donorName: name,
    requestedBy: user.email,
    requestDate: formatDate(new Date()),
    pickupLocation,
    expireDate,
    additionalNotes,
  });

  // State for handling active tab (donor or food)
  const [activeTab, setActiveTab] = useState("food");

  const handleReqFood = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedRequestDate = formatDate(requestData.requestDate);

    const updatedRequestData = {
      ...requestData,
      requestDate: formattedRequestDate,
    };

    // Post the request data
    axios
      .post(
        "https://food-sharing-server-pi.vercel.app/requested-foods",
        updatedRequestData
      )
      .then((res) => {
        toast.success("Food is successfully requested from the donor!");

        // Update the food's status in the database
        axios
          .patch(
            `https://food-sharing-server-pi.vercel.app/update-status/${_id}`,
            { status: "Requested" }
          )
          .then(() => {
            setIsModalOpen(false);
            navigate("/availableFoods");
          });
      });
  };

  return (
    <div className="w-[90%] mx-auto pt-36">
      {/* Go back button */}
      <div>
        <button
          onClick={() => navigate("/availableFoods")}
          className="flex items-center gap-2 text-[#262522] text-lg md:text-xl px-4 py-2 rounded-md"
        >
          <FaArrowCircleLeft />
        </button>
      </div>

      {/* Details container */}
      <div className="flex md:flex-row flex-col gap-4 md:justify-start justify-center md:items-start mt-4">
        {/* Food image */}
        <div className="space-y-4 md:w-2/4 w-full">
          <img
            src={foodImage}
            alt={`${foodName} Image`}
            className="rounded-md shadow-md w-full h-96"
          />
          <div>
            {status === "Requested" ? (
              <button className="btn disabled rounded-md border-2 border-[#2625226e] w-full text-[#262522]">
                Already Requested By Someone
              </button>
            ) : status !== "Available" ? (
              <button className="btn disabled rounded-md border-2 border-[#2625226e] w-full text-[#262522]">
                This Food Is Unavailable
              </button>
            ) : (
              <button
                onClick={
                  user.email === email
                    ? () => toast.error("You can't request your own food")
                    : handleReqFood
                }
                className="btn bg-[#ee6352] rounded-md border-none w-full text-white"
              >
                Request Food
              </button>
            )}
          </div>
        </div>

        {/* Tabs and content */}
        <div className="flex-1 md:w-2/4 w-full">
          {/* Tabs */}
          <div role="tablist" className="tabs tabs-bordered mb-4">
            <button
              role="tab"
              onClick={() => setActiveTab("donor")}
              className={`tab ${activeTab === "donor" ? "tab-active" : ""}`}
            >
              Donor Details
            </button>
            <button
              role="tab"
              onClick={() => setActiveTab("food")}
              className={`tab ${activeTab === "food" ? "tab-active" : ""}`}
            >
              Food Details
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "donor" && (
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={`${name}'s Profile`}
                    className="w-16 h-16 rounded-full shadow-md"
                  />
                  <div>
                    <p className="text-lg font-medium">{name}</p>
                    <p className="text-sm text-gray-600">{email}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "food" && (
              <div className="space-y-2">
                <p>
                  <strong>Food Name:</strong> {foodName}
                </p>
                <p>
                  <strong>Quantity:</strong> {foodQuantity}
                </p>
                <p>
                  <strong>Pickup Location:</strong> {pickupLocation}
                </p>
                <p>
                  <strong>Expiration Date:</strong> {expireDate}
                </p>
                <p>
                  <strong>Status:</strong> {status}
                </p>
                <p>
                  <strong>Additional Notes:</strong> {additionalNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for requesting food */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white overflow-y-auto p-6 rounded-md w-[80%] md:w-2/4 max-h-[80vh]">
            <h2 className="text-xl font-semibold text-[#ee6352] mb-4">
              Request Food
            </h2>

            <form>
              <div className="mb-4">
                <label className="block font-medium">Food Name</label>
                <input
                  type="text"
                  value={foodName}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Food Image</label>
                <input
                  type="text"
                  value={foodImage}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Responsive input fields for mobile and desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label className="block font-medium">Donor Email</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Donor Name</label>
                  <input
                    type="text"
                    value={name}
                    readOnly
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium">Your Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-medium">Request Date</label>
                <input
                  type="text"
                  value={requestData.requestDate}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium">Pickup Location</label>
                <input
                  type="text"
                  value={pickupLocation}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium">Expire Date</label>
                <input
                  type="text"
                  value={expireDate}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={requestData.additionalNotes}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="btn bg-[#ee6352] text-white w-full rounded-md py-2"
              >
                Request Food
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="mt-4 text-red-500 hover:text-red-700"
              >
                Cancel Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
