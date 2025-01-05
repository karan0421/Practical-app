import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";

function Login() {
  const [data, setData] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("Email");
    if (storedEmail) {
      console.log("User is already logged in");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {});
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const user = users.find(
      (item) => item.Email === data.Email && item.Password === data.Password
    );

    if (data.Email === "") {
      showToastError("Email is empty!");
    } else if (!data.Email.includes("@")) {
      showToastError("Please enter a valid email!");
    } else if (data.Password === "") {
      showToastError("Password is empty!");
    } else {
      if (user) {
        localStorage.setItem("Email", data.Email);
        localStorage.setItem("Username", user.username);
        toast.success("Login Successful!");
        
        // Redirect to Product Management after successful login
        navigate("/ProductManagement");
      } else {
        toast.error("Invalid email or password!");
      }
    }
};


  const showToastError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  // const showToastSuccess = (message) =>
  //   toast.success(message, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //   });

  return (
    <>
      <div className="container-fluid">
        <form className="form mx-auto form2 rounded-3">
          <h4 className="text-light">Login Form</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label li2">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name="Email"
              value={data.Email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label li2">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="Password"
              value={data.Password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
          <span className="text-light">
            Forgotten Password?{" "}
            <a
              className="yaa"
              onClick={() => {
                navigate("/Signup");
              }}
            >
              SignUp
            </a>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
