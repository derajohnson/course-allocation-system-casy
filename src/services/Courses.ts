import { Course } from "@/models/Courses";

export default async function handleCreateCourse(
  level: string,
  semester: string,
  course_code: string,
  course_description: string,
  course_title: string,
  credit_unit: number,
): Promise<Course | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hods/courses`, {
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
