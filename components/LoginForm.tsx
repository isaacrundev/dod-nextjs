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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.error) {
      toast({ title: "Login Error", description: res.error });
      setIsLoading(false);
    } else {
      toast({ description: "Login successfully!!" });
      router.push("/dashboard");
    }
  };

  return (
    <>
      {/* <form
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
        <Button className="w-full mt-5" type="submit" disabled={isLoading}>
          Login
        </Button>
      </form> */}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Test email: aloha@qmail.com"
              type="email"
              id="email"
              {...register("email")}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Test password: 111111"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 ">{errors.password.message}</p>
            )}
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
