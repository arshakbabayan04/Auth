import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./header.css";

const Header: FC = () => {
  const activeClazz = "nav-link active-link";
  const defaultClazz = "nav-link";

  return (
    <>
      <header className="header bg-gray-800 h-16 w-full shadow-md">
        <div className="container mx-auto h-full">
          <div className="header_wrapper h-full flex justify-center items-center">
            <nav>
              <ul className="flex gap-10">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? activeClazz : defaultClazz
                    }
                  >
                    Sing in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? activeClazz : defaultClazz
                    }
                  >
                    Sign up
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
