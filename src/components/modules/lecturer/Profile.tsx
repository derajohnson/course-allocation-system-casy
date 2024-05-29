"use client";

import { Lecturer } from "@/models/Lecturers";
import { handleGetLecturer } from "@/services/Lecturers";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [lecturer, setLecturer] = useState<Lecturer>();
  const [token, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code runs only on the client-side
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);
  useEffect(() => {
    async function getLecturer() {
      const data = await handleGetLecturer(token as string);
      setLecturer(data);
    }
    getLecturer();
  }, [token]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">My Profile</h1>
      <div>
        <p className="mb-4">
          Fullname:{" "}
          <span className="font-bold">
            {" "}
            {lecturer?.data.title}, {lecturer?.data?.fullname}
          </span>
        </p>
        <p className="mb-4">
          Designation: <span className="font-bold">{lecturer?.data?.designation}</span>
        </p>
        <p className="mb-4">
          Department: <span className="font-bold">{lecturer?.data?.department}</span>
        </p>
        <p className="mb-4">
          Email: <span className="font-bold">{lecturer?.data?.email}</span>
        </p>
        <p>
          Phone number: <span className="font-bold">{lecturer?.data?.phone_number}</span>
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
