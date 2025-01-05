import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import Slide from "./Slide";
import Cat from "./Cat";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("Email");
    const storedUsername = localStorage.getItem("Username");

    if (userEmail && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "");
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
    
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("Username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/Login");
  };
  const getDate = localStorage.getItem("Email");
  useEffect(() => {
    if (!!getDate) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [getDate]);

  const isAuthPage =
    location.pathname === "/Signup" || location.pathname === "/Login";

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark p-2">
        <div className="container-fluid">
          <img src="logo" className="p-2" alt="logo" />
          <form action="">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {isLoggedIn && (
                  <li className="nav-item">
                    <span className="nav-link text-white">Hii, {username}</span>
                  </li>
                )}
                {isLoggedIn ? (
                  <li className="nav-item">
                    <button
                      className="nav-link active btn text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active btn text-white"
                        onClick={() => navigate("/Signup")}
                      >
                        Signup
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link active btn text-white"
                        onClick={() => navigate("/Login")}
                      >
                        Login
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </form>
        </div>
      </nav>
      <Outlet />
      {!isLoggedIn && !isAuthPage && <Slide  />}
      {!isLoggedIn && !isAuthPage&& <Cat />}
    </>
  );
}

export default Nav;
