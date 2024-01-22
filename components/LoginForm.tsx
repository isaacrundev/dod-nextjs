"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormInputs) => {
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    // const result = await res.json();
    setIsLoading(true);
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.error) {
      alert(res.error);
      setIsLoading(false);
    } else {
      alert("Login successfully!!");
      router.push("/dashboard");
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
        <Button className="mt-5 w-full" type="submit" disabled={isLoading}>
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;

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
