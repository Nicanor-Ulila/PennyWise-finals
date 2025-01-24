import React from 'react';
import logo_trans from './../assets/images/logo_trans.png';
import { useNavigate } from 'react-router-dom';
import { FiTarget, FiClock, FiUser, FiLogOut, FiBookOpen, FiPlayCircle, FiFileText, FiSettings } from 'react-icons/fi';
import { LuWalletMinimal } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from 'axios';

// Data for menus with updated icons
const menus = [
  { title: "Dashboard", path: "/dashboard", icon: <LuLayoutDashboard /> },
  { title: "Budgeting", path: "/budgeting", icon: <LuWalletMinimal /> },
  { title: "Goals", path: "/goals", icon: <FiTarget /> },
  { title: "History", path: "/history", icon: <FiClock /> },
  { title: "PennySave", path: "/pennysave", icon: <FiBookOpen /> }, 
  { title: "PennyPlay", path: "/pennyplay", icon: <FiPlayCircle /> }, 
  { title: "SOA", path: "/soa", icon: <FiFileText /> },
];

// Separate secondary menu for Profile, Settings, and Sign Out
const profileMenu = { title: "Profile", path: "/profile", icon: <FiUser /> };
const settingsMenu = { title: "Settings", path: "/settings", icon: <FiSettings /> }; 
const signOutMenu = { title: "Sign Out", icon: <FiLogOut /> };

// Reusable Sidebar Menu Item Component
const MenuItem = ({ title, path, icon, onClick }) => (
  <li
    className="flex items-center gap-4 p-6 rounded-3xl cursor-pointer 
      hover:bg-[#4e4b6b] hover:text-[#ffffff] hover:scale-105 transform transition duration-300"
    onClick={onClick}
  >
    <span className="text-xl">{icon}</span>
    <span>{title}</span>
  </li>
);

const Sidebar = () => {
  const navigate = useNavigate();

  // Function to handle profile navigation
  const handleProfileNavigation = () => {
    navigate("/profile");
  };

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:5555/logout"); // Adjust the backend URL if necessary
      Cookies.remove("auth_token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Menu rendering function
  const renderMenu = (menuList, isNavigable = true) =>
    menuList.map((menu, index) => (
      <MenuItem
        key={index}
        title={menu.title}
        icon={menu.icon}
        // Profile, Settings, and Sign Out have separate actions
        onClick={
          isNavigable
            ? menu.title === "Profile"
              ? handleProfileNavigation
              : menu.title === "Settings"
              ? () => navigate(settingsMenu.path)
              : () => navigate(menu.path)
            : menu.title === "Sign Out"
            ? handleSignOut
            : undefined
        }
      />
    ));

  return (
    <div className="flex">
      <aside className="h-screen w-72 bg-[#363062] flex flex-col items-center">
        <img src={logo_trans} alt="Logo" className="w-[140px] flex underline-1 pt-5" />
        <div className="p-14 text-md text-[#f5f4e6] font-black font-hagrid rounded-2xl">
          <ul>{renderMenu(menus)}</ul>
          <ul className="pt-24">
            {/* Profile */}
            <MenuItem
              title={profileMenu.title}
              icon={profileMenu.icon}
              onClick={handleProfileNavigation}
            />
            {/* Settings */}
            <MenuItem
              title={settingsMenu.title}
              icon={settingsMenu.icon}
              onClick={() => navigate(settingsMenu.path)}
            />
            {/* Sign Out */}
            <MenuItem
              title={signOutMenu.title}
              icon={signOutMenu.icon}
              onClick={handleSignOut}
            />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
