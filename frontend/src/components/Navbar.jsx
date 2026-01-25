import { Link, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaComments, FaCog, FaHome } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import Logo from "../assets/Y.jpg";

const Navbar = ({ user, handleLogout }) => {
  const location = useLocation();

  // Helper function to style active links
  const linkStyle = (path) => 
    `flex items-center gap-4 p-2 rounded-lg transition-colors ${
      location.pathname === path ? "text-violet-400 bg-gray-900" : "text-white hover:text-violet-400"
    }`;

  return (
    <nav className="w-[200px] bg-[#0f0f0f] border-r border-gray-800 flex flex-col justify-between p-6 text-white h-screen">
      <div>
        <div className="flex justify-center mb-10">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="h-16 w-16 rounded-full border-2 border-violet-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </Link>
        </div>

        <div className="space-y-6">
          {/* MODIFICATION: Wrapped all items in Link components with proper paths */}
          <Link to="/" className={linkStyle("/")}>
            <FaHome size={25} />
            <span className="text-xl font-medium">Home</span>
          </Link>
          
          <Link to="/chats" className={linkStyle("/chats")}>
            <FaComments size={25} />
            <span className="text-xl font-medium">Chats</span>
          </Link>

          <Link to="/following" className={linkStyle("/following")}>
            <RiUserFollowFill size={25} />
            <span className="text-xl font-medium">Following</span>
          </Link>

          <Link to="/settings" className={linkStyle("/settings")}>
            <FaCog size={25} />
            <span className="text-xl font-medium">Settings</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-violet-600 p-2 rounded-full">
            <FaUser size={16} />
          </div>
          <p className="font-semibold truncate">{user?.firstname}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-400 transition-colors w-full"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;