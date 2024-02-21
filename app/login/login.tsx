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
import { signIn } from "next-auth/react";
import { z } from "zod";
import Link from "next/link";

import { FaUser, FaLock } from "react-icons/fa";

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long.",
  }),
});

const LoginForm = () => {
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
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push("/");
        router.refresh();
      }

      // console.log("Login response: ", {response})
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[420px] w-full bg-transparent rounded-lg py-7 px-10 border-2 border-white border-opacity-20 customshadow customebackdrop">
      <Form {...form}>
        <h1 className="text-4xl text-center font-bold text-white">Login</h1>
        <form onSubmit={form.handleSubmit(handleSubmit)}>    
          <div className="relative w-full max-h-[50px] h-full my-7 mx-0">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full h-full">
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
              <FaUser
                className="text-white absolute right-5 top-1/2 text-xs customtransform"
              />
          </div>
          <div className="relative w-full max-h-[50px] h-full my-7 mx-0">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full h-full">
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
              <FaLock
                className="text-white absolute right-5 top-1/2 text-xs customtransform "
              />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-full max-h-[45px] h-full border-none outline-none rounded-[40px] p-5 customshadow text-xs text-darkgray font-bold"
          >
            Login
          </Button>

          <div className="text-[14.5px] text-center mt-5 mb-4 ">
            <p className="text-white"> 
              {`Don't have an account? `} <Link href="/register" className="text-white font-bold hover:underline ">Register</Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
