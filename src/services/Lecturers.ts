import { Lecturer } from "@/models/Lecturers";

export default async function handleGetAllLecturers(token: string): Promise<Lecturer[] | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hods/lecturers`, {
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
