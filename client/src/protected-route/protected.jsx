'use client'
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, allowedRole }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("ai_token");
        if (token) {
          const decoded = jwtDecode(token);
          setRole(decoded.role);

          if (decoded.role !== allowedRole) {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRole]);

  if (loading) {
    return (
      <div className="w-full grid place-items-center">
        <h1 className="text-indigo-500 font-serif italic">Loading...</h1>
      </div>
    );
  }

  if (role === allowedRole) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
