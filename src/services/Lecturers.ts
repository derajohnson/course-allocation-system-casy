export default async function handleGetAllLecturers(token: string) {
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

export async function handleGetLecturer(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lecturers/profile`, {
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

export async function handleGetLecturerCourses(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lecturers/courses`, {
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
