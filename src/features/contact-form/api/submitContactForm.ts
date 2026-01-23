import type { ContactFormSchema } from '../model/ContactForm.schema';

export const submitContactForm = async (data: ContactFormSchema) => {
  const res = await fetch(`/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Submission failed');
  }
};
