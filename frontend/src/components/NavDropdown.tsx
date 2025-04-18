import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils";
import ConfirmModal from "./lib/ConfirmModal";
import { useDropdown } from "../hooks/useDropdown";

const NavDropdown = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const { open, setOpen, ref } = useDropdown();

  return (
    <div>
      <div className="relative" ref={ref}>
        <div
          className="rounded-full w-12 h-12 bg-white flex items-center justify-center cursor-pointer hover:border-2 transition"
          onClick={() => setOpen(!open)}
        >
          {user?.photo ? (
            <img src={user.photo} alt="user photo" className="rounded-full" />
          ) : (
            <p className="text-stone-700 font-medium">
              {getInitials(user?.name || "Default User")}
            </p>
          )}
        </div>
        {open && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10"
            onClick={() => setOpen(false)}
          >
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
              My Profile
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Deactive Account
            </button>
            <button
              onClick={() => logout()}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <ConfirmModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default NavDropdown;
