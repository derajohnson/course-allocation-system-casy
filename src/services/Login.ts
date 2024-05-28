const loginAdmin = async (e: HTMLFormElement) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@uniport.edu.ng",
        password: "admin@123",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const token = data.data.access_token;
    localStorage.setItem("authToken", token);
    return data;
  } catch (error) {
    console.error("Error logging in admin:", error);
  }
};

export async function login(email: string, password: string) {
  const formattedEmail = String(email).toLowerCase();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: formattedEmail, password }),
  });
  const result = await response.json();
  const token = result.data.access_token;
  localStorage.setItem("authToken", token);
  if (response.ok && result.data) {
    return result;
  }
  throw new Error(result.message);
}
