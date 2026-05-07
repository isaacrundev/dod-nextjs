import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupFormSchema = credentialsSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((inputs) => inputs.password === inputs.confirmPassword, {
    message: "Two passwords must match",
    path: ["confirmPassword"],
  });

export type CredentialsInput = z.infer<typeof credentialsSchema>;
export type SignupFormInput = z.infer<typeof signupFormSchema>;
