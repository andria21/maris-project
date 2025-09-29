"use server";

import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({ name, email, password }: RegisterData) {

  if (!name || !email || !password) {
    throw new Error("Missing fields");
  }

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return true;
}
