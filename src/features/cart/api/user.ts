"use server";

import sgMail from "@sendgrid/mail";

const SERVER_URL = process.env.SERVER_URL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type User = {
  id: string;
  email: string;
  [key: string]: unknown;
};

/**
 * Генерує випадковий пароль
 */
function generatePassword(): string {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Перевіряє чи існує користувач з вказаним email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  if (!SERVER_URL) {
    throw new Error("SERVER_URL is not configured");
  }

  try {
    const response = await fetch(
      `${SERVER_URL}/api/users?where[email][equals]=${encodeURIComponent(email)}&limit=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorText = await response.text();
      console.error(`Failed to find user: ${response.status} - ${errorText}`);
      throw new Error(`Failed to find user: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as { docs?: User[] };
    
    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }

    return null;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

/**
 * Створює нового користувача з автоматично згенерованим паролем
 */
export async function createUser(userData: UserData): Promise<{ user: User; password: string }> {
  if (!SERVER_URL) {
    throw new Error("SERVER_URL is not configured");
  }

  const password = generatePassword();

  const userPayload = {
    email: userData.email,
    password: password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
  };

  try {
    const response = await fetch(`${SERVER_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to create user: ${response.status} - ${errorText}`);
      try {
        const errJson = JSON.parse(errorText) as { errors?: Array<{ message?: string }> };
        if (errJson.errors?.length) {
          console.error("Payload errors:", JSON.stringify(errJson.errors, null, 2));
        }
      } catch {
        // ignore
      }
      throw new Error(`Failed to create user: ${response.status} - ${errorText}`);
    }

    const user = (await response.json()) as User;

    // Відправляємо email з credentials
    if (SENDGRID_API_KEY && FROM_EMAIL) {
      try {
        const registrationMsg = {
          to: userData.email,
          from: FROM_EMAIL,
          subject: "Welcome to Estanora - Your Account Details",
          html: `
            <h2>Welcome to Estanora, ${userData.firstName}!</h2>
            <p>Your account has been created successfully. Here are your login credentials:</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p style="color: #d32f2f; font-weight: bold;">Please save this password securely. We recommend changing it after your first login.</p>
            <p>You can now log in to your account to view your orders and manage your profile.</p>
            <p>Thank you for choosing Estanora!</p>
          `,
        };

        await sgMail.send(registrationMsg);
        console.log(`Registration email sent to ${userData.email}`);
      } catch (emailError) {
        console.error("Error sending registration email:", emailError);
        // Не зупиняємо процес, якщо email не відправився
      }
    }

    return { user, password };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Перевіряє чи існує користувач, якщо ні - створює нового
 * Повертає ID користувача
 */
export async function ensureUser(userData: UserData): Promise<string> {
  try {
    // Спочатку перевіряємо чи існує користувач
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
      console.log(`User already exists: ${userData.email}`);
      return existingUser.id;
    }

    // Якщо користувача немає - створюємо нового
    console.log(`Creating new user: ${userData.email}`);
    const { user } = await createUser(userData);
    return user.id;
  } catch (error) {
    console.error("Error ensuring user:", error);
    throw error;
  }
}
