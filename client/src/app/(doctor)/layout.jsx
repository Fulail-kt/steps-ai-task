'use client'
import { Inter } from "next/font/google";
import ProtectedRoute from "../../protected-route/protected";
import Sidebar from "../../components/pages/doctor/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function DoctorLayout({ children }) {
  return (
    <ProtectedRoute allowedRole="doctor">
      
    
        <div className="flex flex-col md:flex-row">
          
            <Sidebar />
          
          <div className="w-full">{children}</div>
        </div>
   
    </ProtectedRoute>
  );
}