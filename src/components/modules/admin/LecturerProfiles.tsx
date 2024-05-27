"use client";

import { useEffect } from "react";
import ProfileCard from "../common/ProfileCard";
import handleAllGetLecturers from "@/services/Lecturers";

const LecturerProfiles = () => {
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    console.log(authToken);

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    async function getLecturers() {
      const data = await handleAllGetLecturers(authToken as string);
      console.log(data);
    }
    getLecturers();
  }, [authToken]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Lecturer Profiles</h1>

      <p className="text-l font-semibold mb-10">Professors</p>
      <div className="grid grid-cols-3 gap-10">
        <ProfileCard
          name="Dr Linda Oghenekaro"
          title="HOD, cybersecurity"
          email="linda@uniport.edu.ng"
          phone="+2349854955"
        />
        <ProfileCard
          name="Professor Edward Ogheneovo"
          title="HOD, AI"
          email="ogheneovo@uniport.edu.ng"
          phone="+2349854955"
        />
      </div>

      <p className="text-l font-semibold my-10">Lecturer 1</p>
      <div className="grid grid-cols-3 gap-10">
        <ProfileCard
          name="Dr Egbono"
          title="HOD, information science"
          email="egbono@uniport.edu.ng"
          phone="+2349854955"
        />
        <ProfileCard
          name="Dr C.B Marcus"
          title="blah blah"
          email="marcus@uniport.edu.ng"
          phone="+2349854955"
        />
      </div>
    </div>
  );
};

export default LecturerProfiles;
