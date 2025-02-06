import { useState,useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useLoginAuthStore from "../../store/useLoginAuthStore";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useLoginAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        className="flex items-center gap-x-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-x-4 ">
          <img
            src="https://placehold.co/60x60"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h5 className=" text-white text-base">{user?.username}</h5>
            <p className=" text-white text-base font-light">welcome</p>
          </div>
        </div>

        <IoIosArrowDown className="w-5 text-white ml-2" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute right-0 bg-white shadow-lg mt-4  w-52 h-10 text-center rounded-md text-black z-10 hover:bg-gray-200">
      <ul >
          <li  onClick={() => logout(navigate)} className="px-4 py-2 bg-red-600 rounded-md  text-black cursor-pointer">Log Out</li>
        </ul> 
        </nav>
       
      )}
    </div>
  );
};

export default Profile;
