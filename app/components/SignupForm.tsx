"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrMsg } from "@/app";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    message: "Two passwords must match",
    path: ["confirmPassword"],
  });

type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Sign up Successfully!!");
        await signIn("credentials", { ...data, redirect: false });
        router.push("/dashboard");
      } else {
        const errMsg: ErrMsg = await res.json();
        alert(errMsg.error);
        setIsLoading(false);
      }
      // else if (res.status === 409) {
      //   alert("Email already existed!");
      // } else if (res.status === 400) {
      //   alert("Missing field(s)!");
      // }

      // return res.json();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-5"
      >
        <div className="space-y-1 ">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="ex: aloha@qmail.com"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 ">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 ">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            type="password"
            id="confirm-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 ">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button className="mt-5 w-full" type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignupForm;

{
  /* <FormField
control={control}
name="email"
render={({ field }) => (
  <FormItem>
    <FormLabel>email</FormLabel>
    <FormControl>
      <Input placeholder="shadcn" {...field} />
    </FormControl>
    <FormDescription>Email </FormDescription>
    <FormMessage />
  </FormItem>
)}
/> */
}
