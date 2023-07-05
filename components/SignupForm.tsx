"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((inputs) => inputs.password !== inputs.confirmPassword, {
    message: "Two passwords must match",
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
    control,
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormInputs) => console.log(data);

  return (
    <Form action="/api/user" control={control}>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </Form>
  );
};

export default SignupForm;
