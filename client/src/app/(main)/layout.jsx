'use client'
import { Inter } from "next/font/google";
import Header from "../../components/global/header";
import ProtectedRoute from "../../protected-route/protected";

const inter = Inter({ subsets: ["latin"] });




export default function Layout({ children }) {

  
  return (
  <main>
          <Header/>
          <ProtectedRoute allowedRole='user'>
          {children}
          </ProtectedRoute>
        </main>
  );
}
