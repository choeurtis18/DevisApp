import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const getNavLinkClass = (path) =>
    `flex gap-2 py-4 px-4 text-lg border rounded-lg ${
      location.pathname === path ? "bg-[#1E5EFF] text-white" : "text-[#5A607F]"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row lg:h-screen md:h-screen">
      {/* Burger Menu Button */}
      <div className="md:hidden lg:hidden flex flex-row gap-2 px-2 shadow-xl">
        <button
          className="p-2 text-[#5A607F] text-lg"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <i className="uil uil-bars"></i>
        </button>

        <div className="flex h-16 shrink-0 items-center gap-2 font-bold">
          <img className="h-8 w-auto" src="" alt="Electri Pro logo" />
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav
        className={`navbar ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transform md:translate-x-0 transition-transform duration-300 ease-in-out md:flex flex-col gap-y-6 overflow-y-auto bg-[#E6E9F4] px-6 min-w-80 lg:min-w-40 md:min-w-40 lg:relative md:relative fixed inset-y-0 left-0 z-50`}
      >
        {/* Close Menu Button */}
        <div className="flex flex-row gap-2 mt-8 mb-4">
          <button
            className="text-[#5A607F] text-lg md:hidden lg:hidden"
            onClick={closeMenu}
          >
            <i className="text-2xl uil uil-times"></i>
          </button>

          <NavLink to="/" className="flex h-16  shrink-0 items-center gap-4 font-bold text-2xl">
            <img className="h-14 w-auto" src="" alt="Electri Pro logo" />
          </NavLink>          
        </div>

        <div className="flex flex-1 flex-col">
          <NavLink to="/" className={getNavLinkClass("/")}>
            <i className="uil uil-create-dashboard"></i>Dashboard
          </NavLink>
          <NavLink to="/orders" className={getNavLinkClass("/orders")}>
            <i className="uil uil-list-ul"></i>Commandes
          </NavLink>
          <NavLink to="/client" className={getNavLinkClass("/client")}>
            <i className="uil uil-users-alt"></i>Client
          </NavLink>
          <NavLink to="/parametre" className={getNavLinkClass("/parametre")}>
            <i className="uil uil-setting"></i>Parametre
          </NavLink>
        </div>
      </nav>

      {/* Main Content */}
      <div className="lg:flex-1 md:flex-1 lg:p-8 md:p-8 px-4 py-8 order-last w-full lg:w-45">
        <Outlet />
      </div>
    </div>
  );
}
