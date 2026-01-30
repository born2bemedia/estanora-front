import { z } from "zod";

export const contactDataSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    repeatNewPassword: z.string().min(1, "Repeat new password"),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "The passwords do not match.",
    path: ["repeatNewPassword"],
  });

export type ContactDataSchema = z.infer<typeof contactDataSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
