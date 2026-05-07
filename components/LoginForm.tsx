"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CredentialsInput, credentialsSchema } from "@/lib/auth-schemas";
import { normalizeAuthError } from "@/lib/auth-error";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsInput>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: CredentialsInput) => {
    setIsLoading(true);

    try {
      const res = await signIn("credentials", { ...data, redirect: false });

      if (res?.error) {
        const msg = await normalizeAuthError(res.error);
        toast({ description: msg, variant: "destructive" });
        return;
      }

      toast({ description: "Login successfully!" });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      const msg = await normalizeAuthError(error);
      toast({ description: msg, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          {errors.email && <p className="text-red-500 ">{errors.email.message}</p>}
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
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;