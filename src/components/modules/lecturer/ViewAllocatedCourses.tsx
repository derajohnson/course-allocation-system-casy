"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllocatedCourse } from "@/models/Courses";
import { handleGetLecturerCourses } from "@/services/Lecturers";
import { useEffect, useState } from "react";

const ViewAllocation = () => {
  const [lecturerCourses, setLecturerCourses] = useState<AllocatedCourse>();

  const [token, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code runs only on the client-side
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
    async function getLecturer() {
      const data = await handleGetLecturerCourses(token as string);
      setLecturerCourses(data);
    }
    getLecturer();
  }, [token]);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">View Your Allocated Courses</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Allocated to</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Credit Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lecturerCourses?.data.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {data.course_code}
                {data.semester === "first" ? ".1" : ".2"}
              </TableCell>
              <TableCell>{data.course_title}</TableCell>
              <TableCell>
                <p>
                  Head lecturer: {data.head_lecturer.title} {data.head_lecturer.name}
                </p>
                <p>
                  Assistant lecturer: {data.assistant_lecturer.title} {data.assistant_lecturer.name}
                </p>
              </TableCell>
              <TableCell>{data.level}</TableCell>
              <TableCell>{data.credit_unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewAllocation;
