import { ZodType, z } from "zod";

export type Course = {
  level: string;
  semester: string;
  course_code: string;
  course_description: string;
  course_title: string;
  credit_unit: number;
  _id?: string;
  is_allocated?: boolean;
};

export type ListOfCourses = {
  data: Course[];
};

export type IndividualCourse = {
  data: {
    course_code: string;
    course_description: string;
    course_title: string;
    credit_unit: number;
    level: string;
    semester: string;
    session: string;
    _id: string;
    head_lecturer: {
      name: string;
      title: string;
    };
    assistant_lecturer: {
      name: string;
      title: string;
    };
  };
};

export type AllocatedCourse = {
  data: [
    {
      course_code: string;
      course_description: string;
      course_title: string;
      credit_unit: number;
      level: string;
      semester: string;
      session: string;
      _id: string;
      head_lecturer: {
        name: string;
        title: string;
      };
      assistant_lecturer: {
        name: string;
        title: string;
      };
    },
  ];
};

export type CourseAllocate = {
  session: string;
  course_code: string;
  head_lecturer: string;
  assistant_lecturer: string;
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
    .max(50, { message: "Course title is too long" }),
  course_description: z
    .string({
      required_error: "Course description is required",
      invalid_type_error: "Please enter a valid course description",
    })
    .min(4, { message: "Course description is too short" }),
  credit_unit: z.coerce.number().max(9, { message: "Credit unit is too much!" }),
});

export const courseAllocateSchema: ZodType<CourseAllocate> = z.object({
  head_lecturer: z.string({
    required_error: "Level is required",
  }),
  assistant_lecturer: z.string({
    required_error: "Level is required",
  }),
  session: z.string({
    required_error: "Level is required",
  }),
  course_code: z.string({
    required_error: "Course code is required",
    invalid_type_error: "Please enter a valid course code",
  }),
});
