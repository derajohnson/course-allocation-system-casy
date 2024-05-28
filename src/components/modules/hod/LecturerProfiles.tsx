"use client";

import { useEffect, useState } from "react";
import ProfileCard from "../common/ProfileCard";
import handleAllGetLecturers from "@/services/Lecturers";

const LecturerProfiles = () => {
  const authToken = localStorage.getItem("authToken");
  const [lecturerProfiles, setLecturerProfiles] = useState();
  useEffect(() => {
    if (!authToken) {
      throw new Error("No authentication token found");
    }
    async function getLecturers() {
      const data = await handleAllGetLecturers(authToken as string);
      setLecturerProfiles(data);
    }
    getLecturers();
  }, [authToken]);

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
