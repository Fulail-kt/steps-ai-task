'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(false);
    const navigate=useRouter()
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    
    useEffect(()=>{
        const token=localStorage.getItem('ai_token')
        console.log(token,"shoeo")
        if(token){
            setToken(true)
            const decode=jwtDecode(token)
            if(decode.role=='doctor'){
                navigate.replace('/dashboard')
            }
        }
    },[token])

    const handleLogout=()=>{
        setToken(false)
        localStorage.removeItem('ai_token')
        window.location.href='/'
    }

    return (
        <header className="bg-gray-800 fixed w-full p-4 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-2xl font-bold">DocBook</span>
                </div>
                <nav className="hidden md:flex space-x-4 w-[58%] justify-between">
                    <div className="space-x-6">
                        <Link href="/">
                            <span className="hover:text-gray-300 cursor-pointer">Home</span>
                        </Link>
                        <Link href="/doctors">
                            <span className="hover:text-gray-300 cursor-pointer">Doctors</span>
                        </Link>
                       {token && <Link href="/profile">
                            <span className="hover:text-gray-300 cursor-pointer">Profile</span>
                        </Link>}
                    </div>
                    {token ?(<Link href="#" onClick={handleLogout}>
                        <span className="hover:text-gray-300 cursor-pointer">Sign out</span>
                    </Link>):
                    (<Link href="/sign-in" >
                        <span className="hover:text-gray-300 cursor-pointer">Sign in</span>
                    </Link>)}
                </nav>
                <div className="md:hidden relative">
                    <button
                        onClick={toggleDropdown}
                        className="bg-gray-800 text-white p-2 px-4 rounded-md"
                    >
                        {isOpen ? "✕" : "☰"}
                    </button>
                    <div
                        className={`absolute right-0 mt-2 w-36 h-screen gap-y-6 py-16 flex flex-col items-center bg-gray-800 bg-opacity-80 shadow-lg z-20 transition-transform transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                    >
                        <Link href="/">
                            <span className="block px-4 py-2 text-sm rounded-md hover:bg-gray-700">Home</span>
                        </Link>
                        <Link href="/doctors">
                            <span className="block px-4 py-2 text-sm rounded-md hover:bg-gray-700">Doctors</span>
                        </Link>
                        <Link href="/profile">
                            <span className="block px-4 py-2 text-sm rounded-md hover:bg-gray-700">Profile</span>
                        </Link>
                        <button onClick={handleLogout}>
                            <span className="block px-4 py-2 text-sm rounded-md hover:bg-gray-700">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
