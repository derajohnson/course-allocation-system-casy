import { ZodType, z } from "zod";

export type Course = {
  level: string;
  semester: string;
  course_code: string;
  course_description: string;
  course_title: string;
  credit_unit: number;
};

export const courseSchema: ZodType<Course> = z.object({
  level: z.string({
    required_error: "Level is required",
  }),
  semester: z.string({
    required_error: "Level is required",
  }),
  course_code: z
    .string({
      required_error: "Course code is required",
      invalid_type_error: "Please enter a valid course code",
    })
    .min(1, { message: "Course code is too short" })
    .max(10, { message: "Course code is too long" }),
  course_title: z
    .string({
      required_error: "Course title is required",
      invalid_type_error: "Please enter a valid course title",
    })
    .min(4, { message: "Course title is too short" })
    .max(30, { message: "Course title is too long" }),
  course_description: z
    .string({
      required_error: "Course description is required",
      invalid_type_error: "Please enter a valid course description",
    })
    .min(4, { message: "Course description is too short" }),
  credit_unit: z.coerce.number().max(9, { message: "Credit unit is too much!" }),
});
