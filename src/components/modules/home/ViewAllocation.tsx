"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const CourseAllocated = () => {
  return (
    <div className="container mx-auto px-4 mb-10" id="course-allocated">
      <h1 className="text-xl font-semibold my-10">Courses Allocated</h1>
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
          <TableRow id="1">
            <TableCell className="font-medium">2022/2023</TableCell>
            <TableCell>CSC 496.1</TableCell>
            <TableCell>
              <Link href="/course-description/1">4th and 5th programming languages</Link>
            </TableCell>
            <TableCell>Year 4</TableCell>
            <TableCell>Dr Linda Oghenekaro</TableCell>
          </TableRow>

          <TableRow id="2">
            <TableCell className="font-medium">2022/2023</TableCell>
            <TableCell>CSC 183.2</TableCell>
            <TableCell>Python programming language</TableCell>
            <TableCell>Year 1</TableCell>
            <TableCell>Professor Edward Ogheneovo</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseAllocated;
