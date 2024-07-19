"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import axiosInstance from "../../../app/services/axios/Axios-instance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const schema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate=useRouter()
  const onSubmit = async(data) => {
    try {
      console.log(data);
      const response= await axiosInstance.post('user/login',data)
      if(response?.data?.success){
        console.log(response.data,"helo")
        toast.success(response?.data?.message)
        localStorage.setItem('ai_token',response?.data?.token)
        const decode=jwtDecode(response.data.token)
        if(decode.role="doctor"){
          navigate.replace('/dashboard',)
        }else{

          navigate.replace('/')
        }
      }else{
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.success(error?.response?.data?.message || error?.message)
    }
  };


  useEffect(()=>{
    const token=localStorage.getItem("ai_token")
    if(token){
      navigate.replace('/dashboard')
    }
  },[])

  return (
    <div className="min-h-screen flex relative items-center justify-center text-black bg-gray-950">
      <div className="flex justify-end right-5 top-5 text-white absolute"><Link href='/'><button className="bg-indigo-600 p-3 rounded-md">Home</button></Link></div>
      <div className="w-full  p-8 rounded shadow-lg flex justify-center flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-400">Sign In</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-64 md:w-96 flex flex-col  items-center text-gray-400"
        >
          <div className="w-full">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className=" px-3 w-full py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full pt-4">
            <button
              type="submit"
              className=" flex justify-center py-2 w-full bg-indigo-800 rounded-md text-white"
            >
              Sign In
            </button>
          </div>
        </form>
        <span className=" w-full gap-1 text-white text-xs mt-2  flex justify-center">
          new here ?
          <Link href="/sign-up " className="text-blue-500">
            Create An account
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
