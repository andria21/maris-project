import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/ExteriorPosts";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connect();

    const { id } = params;

    console.log(id)

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};
