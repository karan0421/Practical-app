import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";

function Signup() {
  const [data, setData] = useState({
    username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [getItem, setItem] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Users")) || [];
    setItem(storedData);
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!data.username) {
      newErrors.username = "Username is required.";
    } else if (data.username.length < 3 || data.username.length > 20) {
      newErrors.username = "Username must be 3-20 characters long.";
    }

    if (!data.Email) {
      newErrors.Email = "Email is required.";
    } else if (!emailRegex.test(data.Email)) {
      newErrors.Email = "Please enter a valid email.";
    }

    if (!data.Password) {
      newErrors.Password = "Password is required.";
    } else if (!passwordRegex.test(data.Password)) {
      newErrors.Password =
        "Password must include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }

    if (!data.ConfirmPassword) {
      newErrors.ConfirmPassword = "Confirm Password is required.";
    } else if (data.Password !== data.ConfirmPassword) {
      newErrors.ConfirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToastError("Please correct the errors in the form.");
      return;
    }

    let users = [...getItem];
    if (editId !== null) {
      users[editId] = data;
    } else {
      users.push(data);
    }

    localStorage.setItem("Users", JSON.stringify(users));
    setItem(users);
    resetForm();
    showToastSuccess(`Welcome to our world, ${data.username}!`);
    
    // Redirect to Login after successful signup
    navigate("/Login");
};


  const resetForm = () => {
    setData({
      username: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    });
    setEditId(null);
    setErrors({});
  };

  const showToastError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
      transition: Bounce,
    });

  const showToastSuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
      transition: Bounce,
    });

  return (
    <>
      <div className="container-fluid p-5">
        <form className="mx-auto form rounded-3">
          <h4 className="li2 text-light">SignUp Form</h4>
          <div className=" mt-4">
            <label className="form-label li2 text-light">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label li2 text-light">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.Email ? "is-invalid" : ""}`}
              name="Email"
              value={data.Email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.Email && (
              <div className="invalid-feedback">{errors.Email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label li2 text-light">Password</label>
            <input
              type="password"
              className={`form-control ${errors.Password ? "is-invalid" : ""}`}
              name="Password"
              value={data.Password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.Password && (
              <div className="invalid-feedback">{errors.Password}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label li2 text-light">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.ConfirmPassword ? "is-invalid" : ""
              }`}
              name="ConfirmPassword"
              value={data.ConfirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.ConfirmPassword && (
              <div className="invalid-feedback">{errors.ConfirmPassword}</div>
            )}
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            {editId !== null ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
