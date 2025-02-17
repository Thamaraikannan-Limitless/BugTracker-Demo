import { useState } from "react";
import Profile from "./Profile";
import logo from "../../assets/logo/limitless-logo.svg";
import { NavLink } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-[#034C41] to-[#71BF44]  ">
      <section className=" flex justify-between items-center py-2 text-base">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="limitless-logo"
            className="h-[40px] md:h-[56px]"
          />
        </div>

        {/* Hamburger Icon for Tablet and Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <IoMenu className="w-7 h-7" />
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden lg:flex lg:items-center gap-x-8">
          <nav className="flex flex-row gap-x-10 text-xs">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                  isActive ? "nav-link active" : "nav-link"
                }`
              }
            >
              DashBoard
            </NavLink>
            <NavLink
              to="/ticket"
              className={({ isActive }) =>
                `relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                  isActive ? "nav-link active" : "nav-link"
                }`
              }
            >
              Tickets
            </NavLink>
            {/* <NavLink to="/test"  className="relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-white after:transition-all hover:after:w-full">test</NavLink> */}
          </nav>
          <div>
            <Profile />
          </div>
        </div>
      </section>

      {/* Mobile & Tablet Menu Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#034C41] z-50">
          {/* Close Icon */}
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              <MdOutlineClose className="w-6 h-6 mx-auto" />
            </button>
          </div>

          {/* Mobile & Tablet Menu Links */}
          <div className="flex flex-col items-center gap-y-8 text-white">
            <Profile />
            <nav className="flex flex-col items-center gap-y-8">
              <NavLink
                to="/dashboard"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                    isActive ? "nav-link active" : "nav-link"
                  }`
                }
              >
                DashBoard
              </NavLink>
              <NavLink
                to="/ticket"
                onClick={() => { 
                  toggleMenu(); // Call the toggle menu function
                }}
                className={({ isActive }) =>
                  `relative hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                    isActive ? "nav-link active" : "nav-link"
                  }`
                }
              >
                Tickets
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
