import { Course, CourseAllocate } from "@/models/Courses";

export async function handleCreateCourse(
  level: string,
  semester: string,
  course_code: string,
  course_description: string,
  course_title: string,
  credit_unit: number,
  token: string,
): Promise<Course | null> {
  const courseList = {
    courses: [{ level, semester, course_code, course_description, course_title, credit_unit }],
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hods/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseList),
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result;
  }
  throw new Error(result.message);
}

export async function handleGetAllCourses(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hods/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result;
  }
  throw new Error(result.message);
}

export async function handleAllocateCourse(
  session: string,
  course_code: string,
  head_lecturer: string,
  assistant_lecturer: string,
  token: string,
): Promise<CourseAllocate | null> {
  const courseAllocate = {
    allocation: {
      session,
      course_id: course_code,
      head_lecturer,
      assistant_lecturer,
    },
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hods/courses/allocate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseAllocate),
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result;
  }
  throw new Error(result.message);
}

export async function handleGetAllAllocatedCourses() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allocated-courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result;
  }
  throw new Error(result.message);
}

export async function handleGetIndividualCourse(courseId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allocated-courses/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result;
  }
  throw new Error(result.message);
}
