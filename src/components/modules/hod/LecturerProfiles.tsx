"use client";

import { useEffect, useState } from "react";
import ProfileCard from "../common/ProfileCard";
import handleAllGetLecturers from "@/services/Lecturers";
import { ListOfLecturers } from "@/models/Lecturers";

const LecturerProfiles = () => {
  const [lecturerProfiles, setLecturerProfiles] = useState<ListOfLecturers>();

  const [token, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code runs only on the client-side
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    async function getLecturers() {
      const data = await handleAllGetLecturers(token as string);
      setLecturerProfiles(data);
    }
    getLecturers();
  }, [token]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">All Lecturers</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        {lecturerProfiles?.data.map((data, index) => (
          <div key={index}>
            <ProfileCard
              name={data.fullname}
              designation={data.designation}
              email={data.email}
              phone={data.phone_number}
              department={data.department}
              title={data.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturerProfiles;
