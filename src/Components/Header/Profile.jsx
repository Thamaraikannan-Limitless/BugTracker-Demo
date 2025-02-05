import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <h5 className=" text-white text-base">Name</h5>
            <p className=" text-white text-base font-light">Desigination</p>
          </div>
        </div>

        <IoIosArrowDown className="w-5 text-white ml-2" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute right-0 bg-white shadow-lg mt-4  w-52 h-10 text-center text-black rounded-md z-10 hover:bg-gray-200">
      <ul >
          <li className="px-4 py-2  cursor-pointer">Log Out</li>
        </ul> 
        </nav>
       
      )}
    </div>
  );
};

export default Profile;
