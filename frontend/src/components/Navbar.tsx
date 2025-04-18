import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import NavDropdown from "./NavDropdown";
const Navbar = () => {
  const path = useLocation();
  const { user } = useAuth();

  return (
    <nav className="bg-primary flex justify-between px-4 md:fixed w-screen">
      <img src={Logo} alt="logo" className="w-24" />
      <div className="space-x-4 flex items-center">
        {user && (
          <>
            <Link
              to="/feed"
              className={`font-medium text-xl border-b-2 border-transparent ${
                path.pathname === "/feed" ? "!border-orange-500" : ""
              }`}
            >
              Feed
            </Link>
            <NavDropdown />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
