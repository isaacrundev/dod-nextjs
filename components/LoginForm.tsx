"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

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

        <Button type="submit">Login</Button>
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
