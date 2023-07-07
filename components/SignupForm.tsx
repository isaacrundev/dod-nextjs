"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: FormInputs) => {
    fetch("/api/user", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });
    // console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
        <Button type="submit">Sign Up</Button>
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