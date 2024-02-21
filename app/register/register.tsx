"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long.",
  }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create a user:", response.statusText);
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Error while creating user:", error);
    }
  };

  return (
    <div className="max-w-[420px] w-full bg-transparent rounded-lg py-7 px-10 border-2 border-white border-opacity-20 customshadow customebackdrop">
      <Form {...form}>
        <h1 className="text-4xl text-center font-bold text-white">Register</h1>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="relative w-full max-h-[50px] h-full my-7 mx-0">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username"
                        type="text"
                        className="w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px]
                          placeholder:text-white py-5 pl-5 pr-[45px] focus:outline-none text-xs text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="relative w-full max-h-[50px] h-full my-7 mx-0">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                        className="w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-[40px]
                          placeholder:text-white py-5 pl-5 pr-[45px] focus:outline-none text-xs text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" variant="outline" className="w-full max-h-[45px] h-full border-none outline-none rounded-[40px] p-5 customshadow text-xs text-darkgray font-bold">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
