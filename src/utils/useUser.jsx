import { useState, useEffect } from "react";
import HttpClient from "./HttpClient";  // Adjust path as necessary

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await HttpClient.get("//localhost:5555/@me");  // Endpoint for fetching user info
        setUser(response.data);  // Assuming response contains { id, username }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data. Redirecting to login...");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;
