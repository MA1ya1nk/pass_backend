import { createContext, useEffect, useState } from "react";
import api from "../api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/users/me");
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
      
         await api.post("/users/logout");

      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const addPassword = async (newData) => {
       try{
        const res = await api.post("/users/addPassword", newData);

            console.log('User logged in successfully:', res.data.data);
            setUser(res.data.data);
       } catch (error) {
        console.error('Error adding password:', error);
       }

};

const delPassword = async (entry) => {
      try{
        const res = await api.post("/users/deletePassword", entry);

  console.log('User deleted successfully:', res.data.data);
            setUser(res.data.data);

        } catch (error) {
          console.error('Error deleting password:', error);
        }

};

/*
const updPassword = async (oldEntry, newEntry) => {
  

  
        const res = await api.post("/users/updatePassword", { oldEntry, newEntry });

  setUser(prev => ({
    ...prev,
    data: res.data.user.data
  }));
};
*/


  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, addPassword, delPassword, updPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
