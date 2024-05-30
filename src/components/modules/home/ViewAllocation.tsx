"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllocatedCourse } from "@/models/Courses";
import { handleGetAllAllocatedCourses } from "@/services/Courses";
import Link from "next/link";
import { useEffect, useState } from "react";

const CourseAllocated = () => {
  const [allAllocatedCourses, setAllAllocatedCourses] = useState<AllocatedCourse>();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function getAllAllocatedCourses() {
      const data = await handleGetAllAllocatedCourses();
      setAllAllocatedCourses(data);
    }
    getAllAllocatedCourses();
  }, []);

  // Handler for search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filtered courses based on search term
  const filteredCourses = allAllocatedCourses?.data.filter((course) =>
    course.course_title.toLowerCase().includes(searchTerm),
  );

  return (
    <div className="container mx-auto px-4 mb-10" id="course-allocated">
      <h1 className="text-xl font-semibold my-10">Courses Allocated</h1>
      <div className="flex justify-center">
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search based on course title"
          className="mb-10 rounded-full pl-4 w-[50%]"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Session</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Year of study</TableHead>
            <TableHead>Head Lecturer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses?.map((course, index) => (
            <TableRow id={course._id} key={index}>
              <TableCell className="font-medium">{course.session}</TableCell>
              <TableCell>
                {course.course_code}
                {course.semester === "first" ? ".1" : ".2"}
              </TableCell>
              <TableCell>
                <Link href={`/course-description/${course._id}`}>{course.course_title}</Link>
              </TableCell>
              <TableCell>Year {course.level.slice(0, 1)}</TableCell>
              <TableCell>
                {course.head_lecturer.title} {course.head_lecturer.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseAllocated;
