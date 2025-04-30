import * as z from 'zod';

export const signUpSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' })
        .max(100, { message: 'Email must be less than 100 characters' }),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(100, { message: 'Password must be less than 100 characters' })
        .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'Password must contain at least one special character' }),
    passwordConfirmation: z
        .string()
        .min(1, { message: 'Password confirmation is required' })
})
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });
