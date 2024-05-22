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
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const CreateCourse = () => {
  const form = useForm();
  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Create Course</h1>
      <Form {...form}>
        <form>
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
                            <SelectItem value="2022/2023">2022/2023</SelectItem>
                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 mt-2 pb-6">
              <FormField
                control={form.control}
                name="session"
                render={({ field }) => (
                  <FormItem>
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
                name="course-code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Enter Course Code</FormLabel>
                    <FormControl>
                      <>
                        <Input placeholder="Enter course code e.g CSC 280" {...field} />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="description"
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
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="credit-unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="labelText">Enter Credit Unit</FormLabel>
                    <FormControl>
                      <>
                        <Input placeholder="Enter credit unit" type="number" {...field} />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-8 text-right self">
                <p className="font-semibold">Submit</p>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCourse;
