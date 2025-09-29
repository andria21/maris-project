"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/actions/register";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const success = await registerUser({ name, email, password });

      if (!success) {
        setError("Registration failed");
        setLoading(false);
        return;
      }

      // Auto login after registration
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/"); // redirect after login
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-[#171717] p-6 shadow-md"
      >
        <h1 className="text-xl font-bold text-center">Register</h1>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input type="text" name="name" required />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" name="email" required />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" name="password" required />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

// -------------------- Server Action --------------------
// Put this at the bottom of the same file (or export in actions.ts if you want reuse)
