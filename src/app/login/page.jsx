"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("✅ Login successful");
      router.push("/dashboard");
    }
  };

  const handleSignUp = async () => {
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("✅ Account created. You can log in now.");
    }
  };

  return (
    <>
      <style>{`
        input::placeholder {
          color: #999;
          opacity: 1;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
              textAlign: "center",
            }}
          >
            Welcome Back to TaskFlow 👋
          </h1>

          <p
            style={{
              color: "#666",
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "0.95rem",
            }}
          >
            Sign in to your account or create a new one
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              margin: "15px 0",
              padding: "12px 16px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "1rem",
              color: "#000",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              margin: "15px 0",
              padding: "12px 16px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "1rem",
              color: "#000",
            }}
          />

          <div style={{ display: "flex", gap: "12px", marginTop: "25px" }}>
            <button
              onClick={handleSignIn}
              style={{
                flex: 1,
                padding: "12px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>

            <button
              onClick={handleSignUp}
              style={{
                flex: 1,
                padding: "12px",
                background: "#f0f0f0",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                background: error.startsWith("✅") ? "#d4edda" : "#f8d7da",
                color: error.startsWith("✅") ? "#155724" : "#721c24",
                borderRadius: "8px",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
