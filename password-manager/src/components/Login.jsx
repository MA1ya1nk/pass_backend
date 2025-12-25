import React, { useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const ref = React.useRef();
  const passwordRef = React.useRef();

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eye.png";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("User logged in successfully:", response.data.data.user);
      setMessageType("success");
      setMessage("Login successful! Redirecting...");
      setUser(response.data.data.user);
      setTimeout(() => {
        navigate("/manager");
      }, 1000);
    } catch (error) {
      console.error("Error logging in:", error);
      setEmail("");
      setPassword("");
      setMessageType("error");
      setMessage(error.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] h-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg">
        <div className="text-center text-3xl py-6 font-semibold border-b">
          Log In your account
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 p-8">
{message && (
              <div
                className={`p-3 rounded-lg text-sm font-medium ${
                  messageType === "error"
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-green-100 text-green-700 border border-green-300"
                }`}
              >
                {message}
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;