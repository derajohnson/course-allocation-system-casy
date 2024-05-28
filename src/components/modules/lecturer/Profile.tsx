"use client";

import { handleGetLecturer } from "@/services/Lecturers";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [lecturer, setLecturer] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    async function getLecturer() {
      const data = await handleGetLecturer(authToken as string);
      setLecturer(data);
    }
    getLecturer();
  }, []);

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
