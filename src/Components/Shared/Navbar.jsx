import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Successfully logged out!");
      })
      .catch((err) => {
        toast.error("Failed to log out. Please try again.");
      });
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#ee6352] font-bold" : "text-[#262522] "
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/availableFoods"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#ee6352] font-bold" : "text-[#262522] "
        }
      >
        Available Foods
      </NavLink>
      <NavLink
        to="/addFood"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#ee6352] font-bold" : "text-[#262522] "
        }
      >
        Add Food
      </NavLink>
      <NavLink
        to="/myFoods"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#ee6352] font-bold" : "text-[#262522] "
        }
      >
        My Foods
      </NavLink>
      <NavLink
        to="/myRequests"
        className={({ isActive }) =>
          isActive ? "border-b-2 border-[#ee6352] font-bold" : "text-[#262522] "
        }
      >
        My Requests
      </NavLink>
      
      
    </>
  );

  return (
    <div className="py-5">
      <div className="navbar px-2 md:px-6 border-2 border-[#2625229d] rounded-full w-[90%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="border-2 border-[#262522] menu menu-sm dropdown-content bg-[#F0EBE1] rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-xl md:text-2xl font-semibold text-[#262522]">
            Food4Good
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-lg font-medium">
            {links}
          </ul>
        </div>
        <div className="flex gap-4 items-center navbar-end">
          
          <div>
            {user && user?.email ? (
              <div className="flex gap-4 items-center">

                    <button
                        onClick={handleLogout}
                        className="btn btn-error text-black"
                        >
                        Logout
                    </button>
                    <img
                    src={user?.photoURL}
                    className="rounded-full w-10 h-10 border-2 border-[#ee6352]"
                    alt="User Avatar"
                  />
                
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                    <Link
                    to="/login"
                    className=" text-[#262522] rounded-lg font-bold"
                >
                    Login
                </Link>
                    <Link
                    to="/register"
                    className="btn bg-[#262522] border-none text-white rounded-full"
                >
                    Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;