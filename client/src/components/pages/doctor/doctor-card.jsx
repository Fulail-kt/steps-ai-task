import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DefaultDoc from '../../../../public/images/default.png'

const DoctorCard = ({doctor}) => {
  return (
    <Link href={`/doctors/${doctor?.id}`}>
        <div className="bg-gray-800 p-3 pt-5 w-48 rounded-lg shadow-lg text-center">
              <Image
                src={doctor?.image ||DefaultDoc}
                alt="Doctor 2"
                width={160}
                height={150}
                className="m-auto rounded-md mb-1 "
              />
              <h2 className="text-xl ">Dr.{doctor?.name}</h2>
              <div className='flex justify-center'>
                  <p className="mb-2 min:w-1/2 text-xs bg-cyan-600 rounded-md p-1 ">{doctor?.specialty}</p>
              </div>
              
            </div>
              </Link>
  )
}

export default DoctorCard