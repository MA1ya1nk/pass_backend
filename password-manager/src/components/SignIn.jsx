import React, {useState} from 'react'
import api from '../api.js';
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
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
        try {
            const response = await api.post("/users/register", {email, username, password});

            console.log('User signed up successfully:', response.data);
            navigate('/login');
        } catch (error) {
          //console.log(error);
  const msg = error.response?.data?.message || "Something went wrong";
  //console.log('Error signing up:', msg);
  alert(msg);

}

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-[400px] h-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg">

    <div className="text-center text-3xl py-6 font-semibold border-b">
      Sign In your account
    </div>

    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Sign In
        </button>

      </div>
      <div className="text-center text-sm pb-2">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login"
            
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              
              </Link>
            </div>

    </form>

  </div>
</div>

  )
}

export default SignIn