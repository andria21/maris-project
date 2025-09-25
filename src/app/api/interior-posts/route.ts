import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/InteriorPost";

export const GET = async () => {
  try {
    await connect();

    const interiorPosts = await Post.find();

    return new NextResponse(JSON.stringify(interiorPosts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connect();

    const body = await request.json();

    const newPost = new Post(body);

    console.log(body);

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};