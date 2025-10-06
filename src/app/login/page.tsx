"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  // const [error, setError] = useState<string | null>(null);
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
      // console.log(res.error);
      toast.error(res.error);
    } else {
      router.push("/?login=success");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center sm:p-0 p-4">
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

        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/?login=success" })}
          type="button"
          className="w-full cursor-pointer bg-blue-500"
        >
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
