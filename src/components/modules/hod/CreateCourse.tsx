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
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Course, courseSchema } from "@/models/Courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCreateCourse } from "@/services/Courses";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import LoaderButton from "../common/LoaderButton";

const CreateCourse = () => {
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
  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      level: "",
      semester: "",
      course_code: "",
      course_description: "",
      course_title: "",
      credit_unit: undefined,
    },
  });
  const validateAndSubmit = async ({
    level,
    semester,
    course_code,
    course_description,
    course_title,
    credit_unit,
  }: Course): Promise<void> => {
    setLoading(true);
    const result = await handleCreateCourse(
      level,
      semester,
      course_code,
      course_description,
      course_title,
      credit_unit,
      token as string,
    );

    if (result) {
      setLoading(false);
      toast({
        title: "Course Creation Successfull",
        description: "You have successfully created a course.",
        duration: 5000,
        variant: "default",
      });
      router.push("/hod-dashboard");
    } else {
      setLoading(false);
      toast({
        title: "Course creation failed",
        description: "An error occurred",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Create Course</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(validateAndSubmit)}>
          <div className="w-3/5">
            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <>
                      <FormLabel className="labelText">Select Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
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
                      </FormControl>
                      {form.formState.errors.level && (
                        <FormMessage className="text-red-500 text-sm">
                          {form.formState.errors.level.message}
                        </FormMessage>
                      )}
                    </>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Enter Semester</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className=" focus:!ring-0 inputStyle">
                          <SelectValue placeholder="Select" className="text-[16px]" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="first">First</SelectItem>
                            <SelectItem value="second">Second</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="course_code"
                render={({ field }) => (
                  <FormItem>
                    <>
                      <FormLabel className="labelText">Enter Course Code</FormLabel>
                      <FormControl>
                        <>
                          <Input placeholder="Enter course code e.g CSC 280" {...field} />
                        </>
                      </FormControl>
                      {form.formState.errors.course_code && (
                        <FormMessage className="text-red-500 text-sm">
                          {form.formState.errors.course_code.message}
                        </FormMessage>
                      )}
                    </>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="course_title"
                render={({ field }) => (
                  <FormItem>
                    <>
                      <FormLabel className="labelText">Enter Course Title</FormLabel>
                      <FormControl>
                        <>
                          <Input placeholder="Enter course title" {...field} />
                        </>
                      </FormControl>
                      {form.formState.errors.course_title && (
                        <FormMessage className="text-red-500 text-sm">
                          {form.formState.errors.course_title.message}
                        </FormMessage>
                      )}
                    </>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="course_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Enter course description</FormLabel>
                    <FormControl>
                      <>
                        <Textarea
                          placeholder="Enter course description"
                          {...field}
                          className="h-36"
                        />
                      </>
                    </FormControl>
                    {form.formState.errors.course_description && (
                      <FormMessage className="text-red-500 text-sm">
                        {form.formState.errors.course_description.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="credit_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Enter Credit Unit</FormLabel>
                    <FormControl>
                      <>
                        <Input placeholder="Enter credit unit" type="number" {...field} />
                      </>
                    </FormControl>
                    {form.formState.errors.credit_unit && (
                      <FormMessage className="text-red-500 text-sm">
                        {form.formState.errors.credit_unit.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <LoaderButton className="px-8 text-right self w-30" isLoading={loading}>
                Submit
              </LoaderButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
