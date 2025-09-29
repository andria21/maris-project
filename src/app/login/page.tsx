"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  }

  console.log(
    error
  );
  

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-[#171717] p-6 shadow-md"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" name="email" required />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" name="password" required />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </form>
    </div>
  );
}
