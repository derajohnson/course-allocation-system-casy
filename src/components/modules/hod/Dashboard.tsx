"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { handleGetAllCourses } from "@/services/Courses";
import { useToast } from "@/components/ui/use-toast";
import LoaderButton from "../common/LoaderButton";

const Dashboard = () => {
  const { toast } = useToast();
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [allCourses, setAllCourses] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found");
    }
    async function getAllCourses() {
      const data = await handleGetAllCourses(authToken as string);
      setAllCourses(data);
    }
    getAllCourses();
  }, [handleDeleteCourse]);

  function handleDeleteCourse(courseId: string) {
    setDeletingCourseId(courseId);
    const authToken = localStorage.getItem("authToken");
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/hods/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((result) => {
            throw new Error(result.message || "Failed to delete item");
          });
        }
        return response.json();
      })
      .then(() => {
        setDeletingCourseId(null);

        toast({
          title: "Course Deleted Successfully",
          description: "You have successfully deleted a course.",
          duration: 5000,
          variant: "default",
        });
      })
      .catch((error) => {
        setDeletingCourseId(null);

        toast({
          title: "Course Deleted failed",
          description: "Something went wrong",
          duration: 5000,
          variant: "default",
        });
        throw error;
      });
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Course List</h1>
      <div className="flex gap-20 mb-10">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="300">300</SelectItem>
              <SelectItem value="400">400</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="first">First</SelectItem>
              <SelectItem value="second">Second</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Allocated</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Credit Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCourses?.data.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {data.course_code}
                {data.semester === "first" ? ".1" : ".2"}
              </TableCell>
              <TableCell>{data.course_title}</TableCell>
              <TableCell>
                {data.is_allocated ? (
                  <Badge variant="outline"> Yes </Badge>
                ) : (
                  <Badge variant="destructive">No</Badge>
                )}
              </TableCell>
              <TableCell>{data.level}</TableCell>
              <TableCell>{data.credit_unit}</TableCell>

              <TableCell className="flex gap-3">
                <Button>Edit</Button>
                <LoaderButton
                  className="w-[30%]"
                  onSubmit={() => handleDeleteCourse(data._id)}
                  isLoading={deletingCourseId === data._id}
                >
                  Delete
                </LoaderButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
