"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/lib/api-error";
import { SignupFormInput, signupFormSchema } from "@/lib/auth-schemas";
import { reportError } from "@/lib/error-report";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInput>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });
  const { toast } = useToast();

  const onSubmit = async (data: SignupFormInput) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast({
          description: await getApiErrorMessage(res, "Sign up failed."),
          variant: "destructive",
        });
        return;
      }

      toast({ description: "Sign up successfully!" });
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      reportError(error, "SignupForm.onSubmit");
      toast({
        description: "Unable to sign up right now. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-5"
      >
        <div className="grid gap-4">
          <div>
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
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 ">{errors.password.message}</p>
            )}
          </div>
          <div>
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
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
