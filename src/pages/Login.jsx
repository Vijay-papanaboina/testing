import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleLogin = () => {
    console.log("[FRONTEND] Login button clicked");
    window.location.href = `${BACKEND_URL}/api/auth/github`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
}

export default Login;
