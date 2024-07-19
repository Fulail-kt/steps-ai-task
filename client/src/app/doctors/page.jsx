'use client'
import DoctorCard from '../../components/pages/doctor/doctor-card';
import Header from '../../components/global/header';
import React, { useEffect, useState } from 'react';
import { getAllDoctors } from '../services/axios/end-points';

const Page = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const fetchData = async () => {
    const response = await getAllDoctors();
    if (response?.success) {
      setDoctors(response?.doctors);
      setFilteredDoctors(response?.doctors);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredDoctors(
      doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, doctors]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 flex justify-center flex-col items-center text-white p-6">
        <div className="py-16 flex w-[80%] md:w-[50%] justify-center">
         
            <input
              type="text"
              placeholder="Search Doctors here"
              className="w-[80%] border border-blue-900 p-1 px-4 rounded-md bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />

        </div>
        <div className="w-full flex justify-center flex-col items-center">
          <div className="grid grid-cols-1 w-[60%] sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
