"use client";
import { jwtDecode } from "jwt-decode";
import { getDoctor, uploadFile } from "../../../app/services/axios/end-points";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { storage } from "../../../app/services/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import Image from "next/image";

const Dashboard = () => {
  const [data, setData] = useState();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    console.log(event);
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!file) return;

    try {
      const fileRef = ref(storage, `files/${Date.now()}_${file.name}`);

      const snapshot = await uploadBytes(fileRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);

      const token = localStorage.getItem("ai_token");
      const decode = jwtDecode(token);
      const response = await uploadFile(decode?.id, {
        filePath: downloadURL,
      });

      if (response.success) {
        toast("File uploaded successfully!");
        fetchData();
      } else {
        toast("Failed to update database with file information");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast("Failed to upload file");
    }
  };
  const fetchData = async () => {
    const token = localStorage.getItem("ai_token");
    const decode = jwtDecode(token);
    const response = await getDoctor(decode?.id);
    if (response.success) {
      setData(response.doctor);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <div className="h-screen flex-1 bg-gray-900 text-white">
        <div className="h-16  bg-gray-800 w-full"></div>
        <div className="max-w-6xl mx-auto p-5">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Profile Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Profile Information
              </h2>
              <div className="bg-gray-700 p-4  justify-between px-10 flex flex-col-reverse  md:flex-row  items-center rounded-lg">
                <div className="w-full">
                  <p>
                    <strong>Name:</strong> {data?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {data?.email}
                  </p>
                  <p>
                    <strong>Specialty:</strong> {data?.specialty}
                  </p>
                  <div className="flex gap-1">
                    <p>
                      {" "}
                      <strong>Documents:</strong>
                    </p>
                    {data?.pdfs?.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-2">
                        <Link target="_blank" href={item?.filePath}>
                          <span className="bg-blue-500 p-1 text-white rounded-md">{`Document ${
                            index + 1
                          }`}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800 size-24 rounded-full">
                  <Image src={data?.image} alt={data?.name} />
                </div>
              </div>
            </div>
            {/* Linked Patients Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Linked Patients</h2>
              <div className="bg-gray-700 p-4 rounded-lg">
                {data?.patients?.length > 0 ? (
                  <ul>
                    {data?.patients.map((patient) => (
                      <li
                        key={patient.id}
                        className="border-b border-gray-600 last:border-b-0 py-2"
                      >
                        {patient.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className=" flex justify-between px-4 w-full">
                    No linked patients.{" "}
                    <Link href="/patients">
                      <button className="text-blue-600">Add</button>
                    </Link>
                  </p>
                )}
              </div>
            </div>
            {/* PDF Upload Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upload PDF</h2>
              <form
                onSubmit={handleFileUpload}
                className="bg-gray-700 p-4 rounded-lg flex items-center"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="mr-4 p-2 border rounded-lg bg-gray-800 text-white border-gray-600"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
