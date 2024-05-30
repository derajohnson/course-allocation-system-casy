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
import { ListOfCourses } from "@/models/Courses";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const { toast } = useToast();
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);
  const [allCourses, setAllCourses] = useState<ListOfCourses>();
  const [token, setAuthToken] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code runs only on the client-side
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);
  useEffect(() => {
    async function getAllCourses() {
      const data = await handleGetAllCourses(token as string);
      setAllCourses(data);
    }
    getAllCourses();
  }, [handleDeleteCourse, token]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Handler for search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filtered courses based on search term
  const filteredCourses = allCourses?.data.filter((course) =>
    course.course_title.toLowerCase().includes(searchTerm),
  );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Course List</h1>
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
            <TableHead>Course Code</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead>Allocated</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Credit Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses?.map((data, index) => (
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

              <TableCell className="flex">
                <LoaderButton
                  className="w-[40%]"
                  onSubmit={() => handleDeleteCourse(data._id as string)}
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
