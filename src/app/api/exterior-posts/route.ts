import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/ExteriorPosts";

export const GET = async () => {
  try {
    await connect();

    const exteriorPosts = await Post.find();
    console.log(exteriorPosts); 

    return new NextResponse(JSON.stringify(exteriorPosts), { status: 200 });
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