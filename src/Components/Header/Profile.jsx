import { useState, useEffect } from "react";
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
        className="flex items-center gap-x-9 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-x-2 ">
          <img
            src="https://placehold.co/60x60"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-white ">
  <h6 className="text-xs font-bold leading-none pt-0">{user?.username} <span className="text-xs font-extralight block leading-0 pt-1 mt-1">UI/UX Designer</span></h6>
  
</div>
        </div>

        <IoIosArrowDown className="w-5 text-white ml-2" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute right-0 bg-white shadow-lg mt-4  w-52 h-10 text-center rounded-md text-black z-10 hover:bg-gray-200">
          <ul>
            <li
              onClick={() => logout(navigate)}
              className="px-2  py-2 bg-green-600 rounded-md  text-white cursor-pointer"
            >
              Log Out
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Profile;
