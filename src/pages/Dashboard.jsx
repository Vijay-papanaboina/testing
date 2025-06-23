import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, fetchUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[FRONTEND] Dashboard loaded");
    if (!user) fetchUser();
  }, [user, fetchUser]);

  if (!user) {
    console.log("[FRONTEND] Dashboard: No user, loading...");
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Welcome, {user.name}</h1>
      <img src={user.avatar_url} width={100} alt="avatar" />
      <p>Username: {user.login}</p>
      <button
        onClick={() => {
          console.log("[FRONTEND] Logout button clicked");
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
