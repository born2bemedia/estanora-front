import { NextResponse } from "next/server";

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = "payload-token";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json(
        { message: "Server URL is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const res = await fetch(`${SERVER_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json()) as {
      user?: { id: string; email?: string; firstName?: string; lastName?: string; phone?: string };
      token?: string;
      exp?: number;
      errors?: Array<{ message?: string }>;
    };

    if (!res.ok) {
      const message = data.errors?.[0]?.message ?? "Login failed.";
      return NextResponse.json({ message }, { status: res.status });
    }

    const token = data.token;
    if (!token) {
      return NextResponse.json(
        { message: "No token received from server." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ user: data.user });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Login error:", message);
    return NextResponse.json(
      { message: "Login failed.", error: message },
      { status: 500 },
    );
  }
}
