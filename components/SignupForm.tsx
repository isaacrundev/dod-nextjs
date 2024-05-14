"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <div className="grid gap-4">
          {/* <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" type="text" />
          </div> */}
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
          Sign Up
        </Button>
      </form>
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
        <Button className="w-full mt-5" type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </form> */}
    </>
  );
};

export default SignupForm;

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/34idCVV03ja
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

// export default function Component() {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-950">
//       <div className="w-full max-w-md space-y-8">
//         <div>
//           <Toggle
//             aria-label="Toggle sign up/login"
//             className="flex justify-center mb-8"
//             variant="outline"
//           >
//             <span className="px-4 py-2 text-sm font-medium">Sign Up</span>
//             <span className="px-4 py-2 text-sm font-medium">Login</span>
//           </Toggle>
//         </div>
//         <div className="p-8 bg-white rounded-lg shadow dark:bg-gray-900">
//           <form className="space-y-6">
//             <div className="grid gap-4">
//               <div>
//                 <Label htmlFor="name">Name</Label>
//                 <Input id="name" placeholder="John Doe" type="text" />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   placeholder="example@email.com"
//                   type="email"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <Input id="password" placeholder="••••••••" type="password" />
//               </div>
//             </div>
//             <Button className="w-full" type="submit">
//               Sign Up
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
