'use client'
import { getAllDoctors } from "./services/axios/end-points";
import Header from "../components/global/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DoctorCard from "../../src/components/pages/doctor/doctor-card";

export default function Home() {
  const [doctors,setDoctors]=useState([])

  const fetchData=async()=>{
    console.log("ddddddddd")
    const response = await getAllDoctors()
    if(response?.success){
      setDoctors(response?.doctors)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
        <Header/>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center mt-16">
            <h1 className="text-5xl font-bold mb-8">
              Welcome to DocBook
            </h1>
            <p className="text-xl mb-6 flex justify-center gap-2 items-center">
              Book appointments with the best doctors <span><Link href='/doctors'>
                <button className="bg-indigo-900 text-white p-1 px-2  rounded-full hover:bg-indigo-600">
                ➤
                </button>
              </Link></span>
            </p>
            <div className="flex justify-center gap-6">
              <Link href='/sign-up'>
                <button className="bg-lime-800 text-white px-5 py-2  rounded-full hover:bg-lime-700">
                  Join as Patient
                </button>
              </Link>
              <Link href='/doc/register'>
                <button className="bg-pink-900 text-white px-5 py-2 rounded-full hover:bg-pink-800">
                  Join as Doctor
                </button>
              </Link>
            </div>

          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {doctors.map((doctor)=>(
            <DoctorCard doctor={doctor}/>
           ))} 
          
          </div>
        </div>
      </main>
      </>
  );
}
