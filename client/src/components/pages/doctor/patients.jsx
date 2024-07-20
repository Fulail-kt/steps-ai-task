'use client'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { getAllPatients, linkPatient } from '../../../app/services/axios/end-points'
import Image from 'next/image'

const Patients = () => {
    const [doctorId, setDoctorId] = useState('')
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getPatients = async () => {
        try {
            setLoading(true)
            const response = await getAllPatients()
            if (response.success) {
                setPatients(response.doctors || [])
            } else {
                setError(response.message || 'Failed to load patients')
            }
        } catch (err) {
            setError('Failed to load patients')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {   
        const token = localStorage.getItem('ai_token');
        if (token) {
            const decode = jwtDecode(token);
            setDoctorId(decode?.id)
        }
        getPatients()
    }, [])

    const handleSendIds = async (patientId) => {
        try {
            const response = await linkPatient({patientId, doctorId})
            if (response.success) {
                setPatients(prevPatients => 
                    prevPatients.map(patient => 
                        patient.id === patientId 
                            ? {...patient, doctors: [...(patient.doctors || []), doctorId]} 
                            : patient
                    )
                )
            } else {
                console.error("Failed to connect patient:", response.message)
            }
        } catch (error) {
            console.error("Error connecting patient:", error)
        }
    };

    // const isConnected = (patient) => patient.doctors?.map((doc)=>console.log(doc))

    console.log(patients,isConnected,"dp")

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Patients List</h1>
            
            {patients.length === 0 ? (
                <p className="text-center text-gray-300">No patients found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {patients.map((patient) => (
                        <div key={patient.id} className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6 flex items-center justify-between">
                                <div className='bg-gray-600 rounded-full w-20 h-20 flex-shrink-0 mr-4'>
                                    <Image 
                                        src={patient?.image || '/default-avatar.png'} 
                                        alt={patient?.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold mb-2 text-white">{patient.name}</h2>
                                    <p className="text-gray-400 mb-4">{patient.email}</p>
                                    <button
                                        onClick={() => handleSendIds(patient.id)}
                                        className={`${
                                            isConnected(patient)
                                                ? 'bg-green-500 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                        } text-white font-bold py-2 px-4 rounded transition duration-300`}
                                        disabled={isConnected(patient)}
                                    >
                                        {isConnected(patient) ? 'Connected' : 'Connect'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Patients