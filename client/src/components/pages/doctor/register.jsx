'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import axiosInstance from "../../../app/services/axios/Axios-instance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Oncologist",
  "Pediatrician",
  "Psychiatrist",
  "Surgeon",
  "Orthopedist",
  "Ophthalmologist",
];

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password cannot exceed 30 characters"),
    confirmPassword: z.string(),
    specialty: z.string().min(2, "Please select a specialty"),
    otherSpecialty: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => (data.specialty === "Other" ? !!data.otherSpecialty : true), {
    message: "Please enter a specialty",
    path: ["otherSpecialty"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [showOtherSpecialty, setShowOtherSpecialty] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      let specialtyToSend = data.specialty;
      if (data.specialty === "Other") {
        specialtyToSend = data.otherSpecialty;
      }
    
      const response = await axiosInstance.post("/doc/register", {
        ...data,
        specialty: specialtyToSend,
      });
  
  
      if (response.data.success) {
        router.replace("/doc/sign-in");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error response:", error.response);
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

  const handleSpecialtyChange = (event) => {
    if (event.target.value === "Other") {
      setShowOtherSpecialty(true);
    } else {
      setShowOtherSpecialty(false);
    }
  };

  useEffect(()=>{
    const token=localStorage.getItem("ai_token")
    if(token){
      router.replace('/dashboard')
    }
  },[])

  return (
    <div className="min-h-screen relative items-center flex flex-col justify-center text-black sm:px-6 lg:px-8 bg-gray-950">
      <div className="flex justify-end right-5 top-5 text-white absolute"><Link href='/'><button className="bg-indigo-600 p-3 rounded-md">Home</button></Link></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-400">Doctor Sign Up</h2>
      </div>

      <div className="w-64 md:w-96">
        <div className="py-3 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-400">
                Specialty
              </label>
              <div className="mt-1">
                <select
                  id="specialty"
                  {...register("specialty")}
                  onChange={handleSpecialtyChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {errors.specialty && (
                  <p className="mt-2 text-sm text-red-600">{errors.specialty.message}</p>
                )}
              </div>
            </div>

            {showOtherSpecialty && (
              <div>
                <label htmlFor="otherSpecialty" className="block text-sm font-medium text-gray-400">
                  Other Specialty
                </label>
                <div className="mt-1">
                  <input
                    id="otherSpecialty"
                    type="text"
                    {...register("otherSpecialty")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.otherSpecialty && (
                    <p className="mt-2 text-sm text-red-600">{errors.otherSpecialty.message}</p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-1 w-full gap-1 text-white text-xs flex justify-center">
            Already have an account?
            <Link href="/doc/sign-in" className="text-blue-500">Doctor sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
