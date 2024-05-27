"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoaderButton from "../common/LoaderButton";
import Image from "next/image";
import eye from "../../../../public/eye.svg";
import eyeNone from "../../../../public/eyeNone.svg";
import { LoginFormData, LoginFormSchema } from "@/models/Login";
import { login } from "@/services/Login";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const validateAndSubmit = async ({ email, password }: LoginFormData): Promise<void> => {
    setLoading(true);
    const result = await login(email, password);
    try {
      if (result) {
        setLoading(false);
        if (result.data.user_data.role === "hod") {
          router.replace("/hod-dashboard");
        }
        if (result.data.user_data.role === "lecturer") {
          router.replace("/lecturer-dashboard");
        }
        toast({
          title: "Login Successful",
          description: "You have successfully logged in",
          duration: 5000,
          variant: "default",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Login failed",
        description: `${error}`,
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = (): void => setShowPassword((prev) => !prev);

  return (
    <div className="container w-full h-screen content-center px-4 justify-center items-center my-10 flex">
      <div className="w-2/5">
        <h1 className="text-xl font-semibold ">Login</h1>
        <p className="mb-10 mt-2 text-slate-700">Login as HOD or as a Lecturer</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(validateAndSubmit)}>
            <div className="w-full">
              <div className="grid gap-y-1.5 pb-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <>
                        <FormLabel className="labelText">Email</FormLabel>
                        <FormControl>
                          <>
                            <Input type="email" placeholder="Enter email" {...field} />
                          </>
                        </FormControl>
                        {form.formState.errors.email && (
                          <FormMessage className="text-red-500 text-sm">
                            {form.formState.errors.email.message}
                          </FormMessage>
                        )}
                      </>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-y-1.5 pb-6 relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <>
                        <FormLabel className="labelText">Password</FormLabel>
                        <FormControl>
                          <>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password"
                              {...field}
                            />
                            <Image
                              src={showPassword ? eye : eyeNone}
                              width={20}
                              height={20}
                              alt="eyeIcon"
                              onClick={toggleShowPassword}
                              className="cursor-pointer absolute right-3 top-8 "
                            />
                          </>
                        </FormControl>
                        {form.formState.errors.password && (
                          <FormMessage className="text-red-500 text-sm">
                            {form.formState.errors.password.message}
                          </FormMessage>
                        )}
                      </>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <LoaderButton className="px-8 text-right self w-30" isLoading={loading}>
                  Log in
                </LoaderButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
