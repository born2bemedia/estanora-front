import { z } from 'zod';

export const createContactFormSchema = () =>
  z.object({
    firstName: z.string().nonempty('This field is required'),
    lastName: z.string().nonempty('This field is required'),
    phone: z.string().nonempty('This field is required'),
    businessEmail: z.string().email('Invalid email address'),
    company: z.string().nonempty('This field is required'),
    website: z.string().nonempty('This field is required'),
    question: z.string(),
    recaptcha: z.string().nonempty('Please complete the reCAPTCHA verification'),
  });

export type ContactFormSchema = z.infer<ReturnType<typeof createContactFormSchema>>;
