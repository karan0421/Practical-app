import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import Slide from "./Slide";
import Cat from "./Cat";
import { Col, Container, Row } from "react-bootstrap";


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


{     !isLoggedIn && !isAuthPage && <footer className="footer-section py-4">
        <Container className="d-flex flex-column">
          <Row className="w-100">
            <Col md={3}>
              <img
                style={{ marginBottom: 25 }}
                src="logo"
                alt="Logo"
                className="img-fluid"
              />
              <p
                style={{
                  fontFamily: "Inter",
                  fontFize: "24px",
                  fontWeight: "500",
                  lineHeight: "36.13px",
                  textAlign: "left",
                  width: "300px",
                  color: "#555555",
                }}
              >
                Savor the artistry where <br /> every coffee is a culinary <br />{" "}
                masterpiece
              </p>
            </Col>
            <Col md={3}>
              <h5>Useful Links</h5>
              <ul className="footer-div">
                <li>
                  <a href="#about">About us</a>
                </li>
                <li>
                  <a href="#services">Events</a>
                </li>
                <li>
                  <a href="#offers">Block</a>
                </li>
                <li>
                  <a href="#offers">FAQ</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Main Menu</h5>
              <ul className="footer-div">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#offers">Offers</a>
                </li>
                <li>
                  <a href="#menu">Menus</a>
                </li>
                <li>
                  <a href="#reservation">Reservation</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Contact Us</h5>
              <p>Email: example@mail.com</p>
              <p>Phone: +123 456 789</p>
              <p>Social media links</p>
            </Col>
          </Row>
          <Row
            className="mt-3 w-100"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Col md={4}>
              <img src="facebook.png"  style={{width: "48px", marginRight: "12px"}}/>
              <img src="instagram.png" style={{width: "48px", marginRight: "12px"}}/>
              <img src="twitter.png" style={{width: "48px", marginRight: "12px"}}/>
              <img src="youtube.png" style={{width: "48px", marginRight: "12px"}}/>
            </Col>
            <Col md={8}>
              <p className="m-auto" style={{color: "#555555"}}>Copyright &copy; 2023 Dscode | All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>}
    </>
  );
}

export default Nav;
