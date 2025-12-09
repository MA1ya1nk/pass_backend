import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/me", {
          withCredentials: true,
        });
        console.log("Auth check successful:", res.data);
        setUser(res.data.user); // ✅ logged in
      } catch (err) {
        if (err.response?.status === 401) {
          // ✅ User simply not logged in (NORMAL)
          setUser(null);
        } else {
          // ⚠️ Real server error
          //console.error("Auth check failed:", err);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);
  

   const logout = async () => {
    
      const c=alert("Are you sure you want to logout?");
      if(c) return;
    try {
      await axios.post(
        "http://localhost:3000/users/logout",
        {}, 
        { withCredentials: true }  // IMPORTANT
      );

      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const addPassword = async (newData) => {
  const res = await axios.post(
    "http://localhost:3000/users/addPassword",
    newData,
    { withCredentials: true }
  );


            console.log('User logged in successfully:', res.data.data);
            setUser(res.data.data);


};

const delPassword = async (entry) => {
  
  const res = await axios.post(
    "http://localhost:3000/users/deletePassword",
    entry,
    { withCredentials: true }
  );

  console.log('User deleted successfully:', res.data.data);
            setUser(res.data.data);

};


const updPassword = async (oldEntry, newEntry) => {
  const res = await axios.post(
    "http://localhost:3000/users/update-password",
    { oldEntry, newEntry },
    { withCredentials: true }
  );

  setUser(prev => ({
    ...prev,
    data: res.data.user.data
  }));
};



  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, addPassword, delPassword, updPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
