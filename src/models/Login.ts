import { ZodType, z } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginFormSchema: ZodType<LoginFormData> = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Please enter a valid email",
      })
      .email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
  })
  .required();
