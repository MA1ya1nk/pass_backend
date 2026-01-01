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
      const fileInputRef = React.useRef();
      const [profilePicture, setProfilePicture] = useState(null)
    const [profilePreview, setProfilePreview] = useState(null)

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

  const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
                return;
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert('File size should not exceed 5MB');
                return;
            }

            setProfilePicture(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeProfilePicture = () => {
        setProfilePicture(null);
        setProfilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const formData = new FormData();
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            const response = await api.post("/users/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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

             {/* Profile Picture Section */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {profilePreview ? (
                                        <img 
                                            src={profilePreview} 
                                            alt="Profile Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg 
                                            className="w-12 h-12 text-gray-400" 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                {profilePreview && (
                                    <button
                                        type="button"
                                        onClick={removeProfilePicture}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            
                            <label className="cursor-pointer">
                                <span className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition inline-block">
                                    {profilePreview ? 'Change Picture' : 'Upload Picture'}
                                </span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </label>
                            <span className="text-xs text-gray-500">Optional (Max 5MB)</span>
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