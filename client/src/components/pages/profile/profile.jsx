'use client'
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
import { getPatient } from '../../../app/services/axios/end-points';


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token=localStorage.getItem('ai_token')
        const decode=jwtDecode(token)
        const response = await getPatient(decode?.id)
        setUser(response.patient);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Profile</h1>
      
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Connected Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.doctors?.map((doctor) => (
          <div key={doctor?.id} className="bg-lime-600 shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{doctor?.name}</h3>
              <p className="text-stone-800 mb-1">Specialty: {doctor?.specialty}</p>
              <p className="text-stone-800">Email: {doctor?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;