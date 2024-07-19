'use client'
import React, { useEffect, useState } from 'react'
import { getDoctor } from '../../services/axios/end-points'
import Image from 'next/image'
import defaultDoc from '../../../../public/images/default.png'
import Header from '../../../components/global/header'

const DoctorDetailsPage = ({ params }) => {
    const id = params.id
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchDoctor = async () => {
        try {
            setLoading(true)
            const response = await getDoctor(id)
            setDoctor(response.doctor)
        } catch (err) {
            setError('Failed to load doctor details')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDoctor()
    }, [id])

    if (loading) return <div className="text-center py-10">Loading...</div>
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>
    if (!doctor) return <div className="text-center py-10">No doctor found</div>

    return (
        <>
        <Header/>
        <div className="container mx-auto w-full h-screen flex justify-center items-center  px-4 py-8">
            <div className=" shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                <div className="">
                    <div className="flex justify-center">
                        <Image
                            className="h-48 w-full object-cover rounded-md md:w-48"
                            src={doctor.image || defaultDoc }
                            alt={doctor.name}
                            width={192}
                            height={192}
                        />
                    </div>
                    <div className="p-8 flex text-center items-center flex-col justify-center">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {doctor?.specialty}
                        </div>
                        <h1 className="mt-2 text-center text-3xl leading-8 font-extrabold tracking-tight text-red-600 sm:text-4xl">
                            {doctor?.name}
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            {doctor?.email}
                        </p>
                        <div className="mt-6">
                            <h2 className="text-lg font-medium text-white/75">About</h2>
                            <p className="mt-2 text-base text-gray-500">
                                {doctor.about || 'No information available.'}
                            </p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DoctorDetailsPage
