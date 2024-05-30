"use client";

import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { CourseAllocate, ListOfCourses, courseAllocateSchema } from "@/models/Courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleAllocateCourse, handleGetAllCourses } from "@/services/Courses";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import LoaderButton from "../common/LoaderButton";
import handleGetAllLecturers from "@/services/Lecturers";
import { ListOfLecturers } from "@/models/Lecturers";

const AllocateCourse = () => {
  const [allCourses, setAllCourses] = useState<ListOfCourses>();
  const [lecturerProfiles, setLecturerProfiles] = useState<ListOfLecturers>();

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code runs only on the client-side
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);
  const form = useForm<CourseAllocate>({
    resolver: zodResolver(courseAllocateSchema),
    defaultValues: {
      course_code: "",
      head_lecturer: "",
      assistant_lecturer: "",
      session: "",
    },
  });
  const validateAndSubmit = async ({
    session,
    course_code,
    head_lecturer,
    assistant_lecturer,
  }: CourseAllocate): Promise<void> => {
    setLoading(true);
    const result = await handleAllocateCourse(
      session,
      course_code,
      head_lecturer,
      assistant_lecturer,
      token as string,
    );

    if (result) {
      setLoading(false);
      toast({
        title: "Course Allocation Successfull",
        description: "You have successfully allocated a course.",
        duration: 5000,
        variant: "default",
      });
      router.push("/hod-dashboard");
    } else {
      setLoading(false);
      toast({
        title: "Course allocation failed",
        description: "An error occurred",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function getAllCourses() {
      const data = await handleGetAllCourses(token as string);
      setAllCourses(data);
    }
    async function getLecturers() {
      const data = await handleGetAllLecturers(token as string);
      setLecturerProfiles(data);
    }
    getLecturers();
    getAllCourses();
  }, [token]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Allocate Course</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(validateAndSubmit)}>
          <div className="w-3/5">
            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="session"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Enter Session</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className=" focus:!ring-0 inputStyle">
                          <SelectValue placeholder="Select" className="text-[16px]" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                            <SelectItem value="2025/2026">2025/2026</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.session && (
                      <FormMessage className="text-red-500 text-sm">
                        {form.formState.errors.session.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="course_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Select Course Code</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className=" focus:!ring-0 inputStyle">
                          <SelectValue placeholder="Select" className="text-[16px]" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {allCourses?.data.map(
                              (course, index) =>
                                !course.is_allocated && (
                                  <SelectItem key={index} value={course._id as string}>
                                    {course.course_code}
                                    {course.semester === "first" ? ".1" : ".2"}
                                  </SelectItem>
                                ),
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.course_code && (
                      <FormMessage className="text-red-500 text-sm">
                        {form.formState.errors.course_code.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="head_lecturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Select Head Lecturer</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className=" focus:!ring-0 inputStyle">
                          <SelectValue placeholder="Select head lecturer" className="text-[16px]" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {lecturerProfiles?.data.map((lecturer, index) => (
                              <SelectItem key={index} value={lecturer._id as string}>
                                {lecturer.title} {lecturer.fullname}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.head_lecturer && (
                      <FormMessage className="text-red-500 text-sm">
                        {form.formState.errors.head_lecturer.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="assistant_lecturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Select Assistant Lecturer</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className=" focus:!ring-0 inputStyle">
                          <SelectValue
                            placeholder="Select assistant lecturer"
                            className="text-[16px]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {lecturerProfiles?.data.map((lecturer, index) => (
                              <SelectItem key={index} value={lecturer._id as string}>
                                {lecturer.title} {lecturer.fullname}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {form.formState.errors.assistant_lecturer && (
                      <FormMessage className="text-red-500 text-sm">
                        {form.formState.errors.assistant_lecturer.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <LoaderButton className="px-8 text-right self w-30" isLoading={loading}>
                Allocate
              </LoaderButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AllocateCourse;
